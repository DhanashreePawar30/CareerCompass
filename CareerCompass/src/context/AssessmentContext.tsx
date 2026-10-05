import React, { createContext, useContext, useState, useEffect } from 'react';
import { FIRO_B_QUESTIONS } from '../data/firoBQuestions';
import { CUSTOM_QUESTIONS } from '../data/customQuestions';
import { CAREER_DATABASE, CAREER_CLUSTERS } from '../data/careerDatabase';
import type { CareerProfile, CareerCluster } from '../data/careerDatabase';
import { calculateArchetype } from '../data/archetypes';
import { fetchFiroBSynthesis, FiroBSynthesisResult } from '../services/aiService';


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

export interface FiroBScores {
  EI: number; // Expressed Inclusion (0-54)
  WI: number; // Wanted Inclusion
  EC: number; // Expressed Control
  WC: number; // Wanted Control
  EA: number; // Expressed Affection
  WA: number; // Wanted Affection
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
  resetAssessment: () => void;
  loadDemoUser: () => void;
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

const demoPersonal: PersonalDetails = {
  name: 'Aarav Sharma',
  age: '21',
  gender: 'Male',
  email: 'aarav.sharma@example.edu',
  phone: '+91 98765 43210'
};

const demoAcademic: AcademicDetails = {
  educationLevel: 'Undergraduate (3rd-4th Year)',
  courseStream: 'Computer Science & Engineering',
  keySubjects: 'Data Structures, Machine Learning, Cloud Systems, Distributed Architecture',
  gradePercentage: '8.8 CGPA (85%)',
  skillTags: ['Python', 'TypeScript', 'React', 'Machine Learning', 'Data Structures', 'System Design', 'SQL']
};

const generateDemoFiroBAnswers = (): Record<number, number> => {
  const ans: Record<number, number> = {};
  for (let i = 1; i <= 54; i++) {
    ans[i] = ((i * 7) % 4) + 3; // generates realistic distribution 3, 4, 5, 6
  }
  return ans;
};

const generateDemoCustomAnswers = (): Record<number, string> => {
  const ans: Record<number, string> = {};
  const options = ['a', 'b', 'c', 'd'];
  for (let i = 1; i <= 30; i++) {
    ans[i] = options[(i * 3) % 4];
  }
  return ans;
};

const emptyFiroBScores: FiroBScores = { EI: 0, WI: 0, EC: 0, WC: 0, EA: 0, WA: 0 };
const emptyTraitScores: CustomTraitScores = { Analytical: 0, Creative: 0, Leadership: 0, Technical: 0, People: 0 };

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(() => {
    const saved = localStorage.getItem('cc_personal');
    return saved ? JSON.parse(saved) : emptyPersonal;
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
    const saved = localStorage.getItem('cc_firob_ai_insight');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  useEffect(() => {
    if (firoBAiInsight) {
      localStorage.setItem('cc_firob_ai_insight', JSON.stringify(firoBAiInsight));
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

  // Accurate real score aggregation from real answers
  const calculateFiroBScores = (): FiroBScores => {
    const scores: FiroBScores = { EI: 0, WI: 0, EC: 0, WC: 0, EA: 0, WA: 0 };
    FIRO_B_QUESTIONS.forEach(q => {
      const val = firoBAnswers[q.id];
      if (val !== undefined) {
        scores[q.category] += val;
      }
    });
    return scores;
  };

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

  const firoBScores = Object.keys(firoBAnswers).length > 0 ? calculateFiroBScores() : emptyFiroBScores;
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

  const resetAssessment = () => {
    setFiroBAnswers({});
    setCustomAnswers({});
    setIsFiroBComplete(false);
    setIsCustomComplete(false);
    setPersonalDetails(emptyPersonal);
    setAcademicDetails(emptyAcademic);
    localStorage.removeItem('cc_personal');
    localStorage.removeItem('cc_academic');
    localStorage.removeItem('cc_firob_answers');
    localStorage.removeItem('cc_custom_answers');
    localStorage.removeItem('cc_firob_complete');
    localStorage.removeItem('cc_custom_complete');
    localStorage.removeItem('cc_firob_ai_insight');
    setFiroBAiInsight(null);
  };

  const generateFiroBAiInsight = async () => {
    if (isLoadingAi) return;
    setIsLoadingAi(true);
    try {
      const archetype = calculateArchetype(firoBScores, customTraitScores);
      const payload = {
        firoBScores,
        profile: {
          educationLevel: academicDetails.educationLevel,
          courseStream: academicDetails.courseStream,
          institution: personalDetails.email,
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
      const insight = await fetchFiroBSynthesis(payload);
      setFiroBAiInsight(insight);
    } catch (err) {
      console.error('Failed to generate FIRO-B AI synthesis:', err);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const loadDemoUser = () => {
    const firoB = generateDemoFiroBAnswers();
    const custom = generateDemoCustomAnswers();

    setPersonalDetails(demoPersonal);
    setAcademicDetails(demoAcademic);
    setFiroBAnswers(firoB);
    setCustomAnswers(custom);
    setIsFiroBComplete(true);
    setIsCustomComplete(true);

    localStorage.setItem('cc_personal', JSON.stringify(demoPersonal));
    localStorage.setItem('cc_academic', JSON.stringify(demoAcademic));
    localStorage.setItem('cc_firob_answers', JSON.stringify(firoB));
    localStorage.setItem('cc_custom_answers', JSON.stringify(custom));
    localStorage.setItem('cc_firob_complete', 'true');
    localStorage.setItem('cc_custom_complete', 'true');
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
        loadDemoUser,
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
