import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CUSTOM_QUESTIONS } from '../data/customQuestions';
import { CAREER_DATABASE, CAREER_CLUSTERS } from '../data/careerDatabase';
import type { CareerProfile, CareerCluster } from '../data/careerDatabase';
import { calculateArchetype } from '../data/archetypes';
import { fetchFiroBSynthesis } from '../services/aiService';
import type { FiroBSynthesisResult } from '../services/aiService';
import { fetchProgress, saveProgress } from '../services/progressService';
import type { ProgressSnapshot } from '../services/progressService';
import { calculateFiroBScores } from '../data/firoBScoring';
import type { FiroBScores } from '../data/firoBScoring';


export interface PersonalDetails {
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
}

export interface AcademicDetails {
  educationLevel: string;
  courseStream: string;
  keySubjects: string;
  gradePercentage: string;
  skillTags: string[];
}

export interface CustomTraitScores {
  Analytical: number;
  Creative: number;
  Leadership: number;
  Technical: number;
  People: number;
}

interface AssessmentContextType {
  personalDetails: PersonalDetails;
  academicDetails: AcademicDetails;
  firoBAnswers: Record<number, number>;
  customAnswers: Record<number, string>;
  firoBScores: FiroBScores;
  firoBNormalizedScores: FiroBScores;
  firoBDisplayScores: FiroBScores;
  customTraitScores: CustomTraitScores;
  isProfileComplete: boolean;
  isFiroBComplete: boolean;
  isCustomComplete: boolean;
  isAssessmentComplete: boolean;
  
  // Dynamic Ranked Careers & Clusters
  rankedCareers: CareerProfile[];
  rankedClusters: (CareerCluster & { matchPercentage: number })[];

  // FIRO-B AI Insights
  firoBAiInsight: FiroBSynthesisResult | null;
  isLoadingAi: boolean;

  // Actions
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void;
  updateAcademicDetails: (details: Partial<AcademicDetails>) => void;
  addSkillTag: (tag: string) => void;
  removeSkillTag: (tag: string) => void;
  setFiroBAnswer: (questionId: number, value: number) => void;
  setCustomAnswer: (questionId: number, optionId: string) => void;
  completeFiroB: () => void;
  completeCustom: () => void;
  /** Clears answers for a retake; keeps the signed-in user's profile. */
  resetAssessment: () => void;
  /** Switches to the given account, restoring its saved progress from MongoDB (or starting fresh). */
  signIn: (email: string, profile?: { personal?: Partial<PersonalDetails>; academic?: Partial<AcademicDetails> }) => Promise<void>;
  /** Signs out; the account's progress stays saved and is restored on the next sign-in. */
  logout: () => void;
  getCareerById: (id: string) => CareerProfile | undefined;
  generateFiroBAiInsight: () => Promise<void>;
}

const emptyPersonal: PersonalDetails = {
  name: '',
  age: '',
  gender: '',
  email: '',
  phone: ''
};

const emptyAcademic: AcademicDetails = {
  educationLevel: '',
  courseStream: '',
  keySubjects: '',
  gradePercentage: '',
  skillTags: []
};

/**
 * Everything saved per account. MongoDB (user_progress) is the source of truth;
 * localStorage cc_accounts[email] is an offline backup used when the server is unreachable.
 */
type AccountSnapshot = ProgressSnapshot;

const emptySnapshot: AccountSnapshot = {
  personal: emptyPersonal,
  academic: emptyAcademic,
  firoBAnswers: {},
  customAnswers: {},
  isFiroBComplete: false,
  isCustomComplete: false,
  firoBAiInsight: null
};

const SAVE_DEBOUNCE_MS = 600;

const ACCOUNTS_KEY = 'cc_accounts';

const readAccounts = (): Record<string, AccountSnapshot> => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
  } catch {
    return {};
  }
};

/** "tanishka.pawar@x.com" -> "Tanishka Pawar" (used only when no registered name is known) */
const nameFromEmail = (email: string) =>
  email
    .split('@')[0]
    .split(/[._\-+\d]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const emptyTraitScores: CustomTraitScores = { Analytical: 0, Creative: 0, Leadership: 0, Technical: 0, People: 0 };

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(() => {
    const saved = localStorage.getItem('cc_personal');
    const parsed: PersonalDetails = saved ? JSON.parse(saved) : emptyPersonal;
    // Migrate users who registered before the register page wrote to cc_personal
    if (!parsed.name) {
      const legacyName = localStorage.getItem('cc_user_name');
      const legacyEmail = localStorage.getItem('cc_user_email');
      const legacyProfile = JSON.parse(localStorage.getItem('cc_user_profile') || '{}');
      return {
        ...parsed,
        name: legacyName || parsed.name,
        email: parsed.email || legacyEmail || '',
        phone: parsed.phone || legacyProfile.phone || '',
        age: parsed.age || legacyProfile.age || '',
        gender: parsed.gender || legacyProfile.gender || ''
      };
    }
    return parsed;
  });

  const [academicDetails, setAcademicDetails] = useState<AcademicDetails>(() => {
    const saved = localStorage.getItem('cc_academic');
    return saved ? JSON.parse(saved) : emptyAcademic;
  });

  const [firoBAnswers, setFiroBAnswers] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('cc_firob_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [customAnswers, setCustomAnswers] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('cc_custom_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [isFiroBComplete, setIsFiroBComplete] = useState<boolean>(() => {
    return localStorage.getItem('cc_firob_complete') === 'true';
  });

  const [isCustomComplete, setIsCustomComplete] = useState<boolean>(() => {
    return localStorage.getItem('cc_custom_complete') === 'true';
  });

  const [firoBAiInsight, setFiroBAiInsight] = useState<FiroBSynthesisResult | null>(() => {
    const saved = localStorage.getItem('cc_firob_ai_insight_normalized_v1');
    const parsed: FiroBSynthesisResult | null = saved ? JSON.parse(saved) : null;
    // Only real AI output is cached; drop stale fallbacks so the AI is retried
    return parsed?.source === 'openai' ? parsed : null;
  });

  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  useEffect(() => {
    if (firoBAiInsight?.source === 'openai') {
      localStorage.setItem('cc_firob_ai_insight_normalized_v1', JSON.stringify(firoBAiInsight));
    } else {
      localStorage.removeItem('cc_firob_ai_insight_normalized_v1');
    }
  }, [firoBAiInsight]);

  useEffect(() => {
    localStorage.setItem('cc_personal', JSON.stringify(personalDetails));
  }, [personalDetails]);

  useEffect(() => {
    localStorage.setItem('cc_academic', JSON.stringify(academicDetails));
  }, [academicDetails]);

  useEffect(() => {
    localStorage.setItem('cc_firob_answers', JSON.stringify(firoBAnswers));
  }, [firoBAnswers]);

  useEffect(() => {
    localStorage.setItem('cc_custom_answers', JSON.stringify(customAnswers));
  }, [customAnswers]);

  useEffect(() => {
    localStorage.setItem('cc_firob_complete', isFiroBComplete ? 'true' : 'false');
  }, [isFiroBComplete]);

  useEffect(() => {
    localStorage.setItem('cc_custom_complete', isCustomComplete ? 'true' : 'false');
  }, [isCustomComplete]);

    const calculateTraitScores = (): CustomTraitScores => {
    const traits: CustomTraitScores = { Analytical: 0, Creative: 0, Leadership: 0, Technical: 0, People: 0 };
    CUSTOM_QUESTIONS.forEach(q => {
      const selectedOptionId = customAnswers[q.id];
      if (selectedOptionId) {
        const option = q.options.find(o => o.id === selectedOptionId);
        if (option && option.trait in traits) {
          traits[option.trait as keyof CustomTraitScores] += 1;
        }
      }
    });
    return traits;
  };

  const {
    rawScores: firoBScores,
    normalizedScores: firoBNormalizedScores,
    displayScores: firoBDisplayScores
  } = calculateFiroBScores(firoBAnswers);
  const customTraitScores = Object.keys(customAnswers).length > 0 ? calculateTraitScores() : emptyTraitScores;

  const isProfileComplete = Boolean(personalDetails.name && personalDetails.email);
  const isAssessmentComplete = isFiroBComplete && isCustomComplete;

  // Dynamic Career Rankings computed from Real User Responses
  const rankedCareers: CareerProfile[] = CAREER_DATABASE.map(career => {
    let score = 70; // baseline

    if (career.cluster === 'Data & Analytics') {
      score += (customTraitScores.Analytical * 2.5) + (customTraitScores.Technical * 1.5);
      if (firoBScores.WC > firoBScores.EC) score += 4;
    } else if (career.cluster === 'Software & Cloud Engineering') {
      score += (customTraitScores.Technical * 2.5) + (customTraitScores.Analytical * 1.5);
      if (firoBScores.EC > 20) score += 3;
    } else if (career.cluster === 'Product & Strategic Management') {
      score += (customTraitScores.Leadership * 2.5) + (customTraitScores.People * 1.5);
      if (firoBScores.EI > 20) score += 5;
    } else if (career.cluster === 'Design & Creative Technology') {
      score += (customTraitScores.Creative * 3) + (customTraitScores.People * 1);
    }

    // Boost based on matched skills from real user input
    if (academicDetails.skillTags && academicDetails.skillTags.length > 0) {
      const matched = career.requiredSkills.filter(req =>
        academicDetails.skillTags.some(tag => req.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(req.toLowerCase()))
      );
      score += matched.length * 2;
    }

    const clamped = Math.min(99, Math.max(65, Math.round(score)));
    return { ...career, matchScore: clamped };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Dynamic Clusters match percentage
  const rankedClusters = CAREER_CLUSTERS.map(cluster => {
    const clusterCareers = rankedCareers.filter(c => c.cluster === cluster.name);
    const avgScore = clusterCareers.length > 0
      ? Math.round(clusterCareers.reduce((acc, c) => acc + c.matchScore, 0) / clusterCareers.length)
      : 80;
    return { ...cluster, matchPercentage: avgScore };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  // ── MongoDB sync ──────────────────────────────────────────
  // Saving waits until the initial server pull finishes, so a stale local copy never overwrites newer server data
  const [isSyncReady, setIsSyncReady] = useState(false);
  const pendingSave = useRef<{ email: string; snapshot: AccountSnapshot } | null>(null);
  const saveTimer = useRef<number | undefined>(undefined);

  const flushPendingSave = () => {
    window.clearTimeout(saveTimer.current);
    const pending = pendingSave.current;
    pendingSave.current = null;
    if (pending) {
      saveProgress(pending.email, pending.snapshot, true).catch(err =>
        console.warn('[Progress] Save to server failed; kept local copy.', err)
      );
    }
  };

  // On first load, pull the signed-in account from MongoDB if the server copy is newer
  useEffect(() => {
    const email = personalDetails.email.trim();
    if (!email) {
      setIsSyncReady(true);
      return;
    }
    const localSavedAt = Number(localStorage.getItem('cc_saved_at') || 0);
    fetchProgress(email)
      .then(remote => {
        if (remote && (remote.clientSavedAt ?? 0) > localSavedAt) loadSnapshot(remote);
      })
      .catch(err => console.warn('[Progress] Could not reach server; using local copy.', err))
      .finally(() => setIsSyncReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save every change: immediately to the local backup, debounced to MongoDB
  useEffect(() => {
    const email = personalDetails.email.trim();
    if (!isSyncReady || !email) return;

    const snapshot: AccountSnapshot = {
      personal: personalDetails,
      academic: academicDetails,
      firoBAnswers,
      customAnswers,
      firoBScores: Object.keys(firoBAnswers).length > 0 ? firoBScores : null,
      firoBScoreVersion: 'normalized-v1',
      isFiroBComplete,
      isCustomComplete,
      firoBAiInsight: firoBAiInsight?.source === 'openai' ? firoBAiInsight : null,
      clientSavedAt: Date.now()
    };

    localStorage.setItem('cc_saved_at', String(snapshot.clientSavedAt));
    const accounts = readAccounts();
    accounts[email.toLowerCase()] = snapshot;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    pendingSave.current = { email, snapshot };
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(flushPendingSave, SAVE_DEBOUNCE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSyncReady, personalDetails, academicDetails, firoBAnswers, customAnswers, isFiroBComplete, isCustomComplete, firoBAiInsight]);

  // Don't lose the last few answers if the tab is closed mid-debounce
  useEffect(() => {
    window.addEventListener('pagehide', flushPendingSave);
    return () => window.removeEventListener('pagehide', flushPendingSave);
  }, []);

  const updatePersonalDetails = (details: Partial<PersonalDetails>) => {
    setPersonalDetails(prev => ({ ...prev, ...details }));
  };

  const updateAcademicDetails = (details: Partial<AcademicDetails>) => {
    setAcademicDetails(prev => ({ ...prev, ...details }));
  };

  const addSkillTag = (tag: string) => {
    if (!tag.trim()) return;
    if (!academicDetails.skillTags.includes(tag.trim())) {
      setAcademicDetails(prev => ({
        ...prev,
        skillTags: [...prev.skillTags, tag.trim()]
      }));
    }
  };

  const removeSkillTag = (tag: string) => {
    setAcademicDetails(prev => ({
      ...prev,
      skillTags: prev.skillTags.filter(t => t !== tag)
    }));
  };

  const setFiroBAnswer = (questionId: number, value: number) => {
    setFiroBAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const setCustomAnswer = (questionId: number, optionId: string) => {
    setCustomAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const completeFiroB = () => {
    setIsFiroBComplete(true);
  };

  const completeCustom = () => {
    setIsCustomComplete(true);
  };

  const loadSnapshot = (snapshot: AccountSnapshot) => {
    setPersonalDetails({ ...emptyPersonal, ...snapshot.personal });
    setAcademicDetails({ ...emptyAcademic, ...snapshot.academic });
    setFiroBAnswers(snapshot.firoBAnswers ?? {});
    setCustomAnswers(snapshot.customAnswers ?? {});
    setIsFiroBComplete(Boolean(snapshot.isFiroBComplete));
    setIsCustomComplete(Boolean(snapshot.isCustomComplete));
    setFiroBAiInsight(
      snapshot.firoBScoreVersion === 'normalized-v1' && snapshot.firoBAiInsight?.source === 'openai'
        ? snapshot.firoBAiInsight
        : null
    );
  };

  const resetAssessment = () => {
    setFiroBAnswers({});
    setCustomAnswers({});
    setIsFiroBComplete(false);
    setIsCustomComplete(false);
    setFiroBAiInsight(null);
  };

  const signIn: AssessmentContextType['signIn'] = async (email, profile) => {
    // Save the previous account's last changes before switching
    flushPendingSave();

    const trimmedEmail = email.trim();
    const key = trimmedEmail.toLowerCase();

    let saved: AccountSnapshot | null | undefined;
    try {
      // Server first; fall back to a local copy (offline, or progress made before MongoDB sync existed)
      saved = (await fetchProgress(trimmedEmail)) ?? readAccounts()[key];
    } catch (err) {
      console.warn('[Progress] Could not reach server; using local copy.', err);
      saved = readAccounts()[key];
    }
    // Profiles registered before per-account snapshots existed
    const legacy = JSON.parse(localStorage.getItem('cc_registered_users') || '{}')[key];
    const base: AccountSnapshot = saved ?? {
      ...emptySnapshot,
      personal: { ...emptyPersonal, ...legacy?.personal },
      academic: { ...emptyAcademic, ...legacy?.academic }
    };

    const personal = { ...emptyPersonal, ...base.personal, ...profile?.personal, email: trimmedEmail };
    if (!personal.name) personal.name = nameFromEmail(trimmedEmail);

    loadSnapshot({
      ...base,
      personal,
      academic: { ...emptyAcademic, ...base.academic, ...profile?.academic }
    });
    setIsSyncReady(true);
    localStorage.setItem('cc_signed_in', 'true');
  };

  const logout = () => {
    flushPendingSave();
    loadSnapshot(emptySnapshot);
    localStorage.removeItem('cc_signed_in');
    localStorage.removeItem('cc_saved_at');
  };

  const generateFiroBAiInsight = async () => {
    if (isLoadingAi) return;
    setIsLoadingAi(true);
    try {
      const archetype = calculateArchetype(firoBScores, customTraitScores);
      const payload = {
        firoBScores: firoBNormalizedScores,
        profile: {
          educationLevel: academicDetails.educationLevel,
          courseStream: academicDetails.courseStream,
          institution: '',
          gradePercentage: academicDetails.gradePercentage,
          skills: academicDetails.skillTags
        },
        archetype: {
          id: archetype.id,
          title: archetype.title
        },
        careerResults: rankedCareers.slice(0, 5).map(c => ({
          id: c.id,
          title: c.title,
          matchScore: c.matchScore
        }))
      };
      const insight = await fetchFiroBSynthesis(payload, personalDetails.email);
      setFiroBAiInsight(insight);
    } catch (err) {
      console.error('Failed to generate FIRO-B AI synthesis:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const getCareerById = (id: string) => {
    return rankedCareers.find(c => c.id === id) || CAREER_DATABASE.find(c => c.id === id);
  };

  return (
    <AssessmentContext.Provider
      value={{
        personalDetails,
        academicDetails,
        firoBAnswers,
        customAnswers,
        firoBScores,
        firoBNormalizedScores,
        firoBDisplayScores,
        customTraitScores,
        isProfileComplete,
        isFiroBComplete,
        isCustomComplete,
        isAssessmentComplete,
        rankedCareers,
        rankedClusters,
        firoBAiInsight,
        isLoadingAi,
        updatePersonalDetails,
        updateAcademicDetails,
        addSkillTag,
        removeSkillTag,
        setFiroBAnswer,
        setCustomAnswer,
        completeFiroB,
        completeCustom,
        resetAssessment,
        signIn,
        logout,
        getCareerById,
        generateFiroBAiInsight
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
