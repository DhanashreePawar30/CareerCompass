import React, { createContext, useContext, useState, useEffect } from 'react';
import { FIRO_B_QUESTIONS } from '../data/firoBQuestions';
import { CUSTOM_QUESTIONS } from '../data/customQuestions';
import { CAREER_DATABASE } from '../data/careerDatabase';
import type { CareerProfile } from '../data/careerDatabase';

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
  EI: number; // Expressed Inclusion
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
  getCareerById: (id: string) => CareerProfile | undefined;
}

const defaultPersonal: PersonalDetails = {
  name: 'Tanishka Sharma',
  age: '20',
  gender: 'Female',
  email: 'tanishka.sharma@example.com',
  phone: '+91 98765 43210'
};

const defaultAcademic: AcademicDetails = {
  educationLevel: 'Undergraduate (Year 3)',
  courseStream: 'B.Tech Computer Science & Engineering',
  keySubjects: 'Data Structures, Database Management Systems, Applied Statistics, Software Engineering',
  gradePercentage: '88.5%',
  skillTags: ['Python', 'SQL', 'Data Analysis', 'React', 'Problem Solving', 'UI Design']
};

const defaultFiroBScores: FiroBScores = { EI: 38, WI: 42, EC: 44, WC: 40, EA: 36, WA: 45 };
const defaultTraitScores: CustomTraitScores = { Analytical: 12, Technical: 10, Creative: 8, Leadership: 7, People: 6 };

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(() => {
    const saved = localStorage.getItem('cc_personal');
    return saved ? JSON.parse(saved) : defaultPersonal;
  });

  const [academicDetails, setAcademicDetails] = useState<AcademicDetails>(() => {
    const saved = localStorage.getItem('cc_academic');
    return saved ? JSON.parse(saved) : defaultAcademic;
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

  const calculateFiroBScores = (): FiroBScores => {
    const scores: FiroBScores = { EI: 0, WI: 0, EC: 0, WC: 0, EA: 0, WA: 0 };
    FIRO_B_QUESTIONS.forEach(q => {
      const val = firoBAnswers[q.id] || 4;
      scores[q.category] += val;
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

  const firoBScores = Object.keys(firoBAnswers).length > 0 ? calculateFiroBScores() : defaultFiroBScores;
  const customTraitScores = Object.keys(customAnswers).length > 0 ? calculateTraitScores() : defaultTraitScores;

  const isProfileComplete = Boolean(personalDetails.name && personalDetails.email && academicDetails.educationLevel);
  const isAssessmentComplete = isFiroBComplete && isCustomComplete;

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
    localStorage.removeItem('cc_firob_answers');
    localStorage.removeItem('cc_custom_answers');
    localStorage.removeItem('cc_firob_complete');
    localStorage.removeItem('cc_custom_complete');
  };

  const getCareerById = (id: string) => {
    return CAREER_DATABASE.find(c => c.id === id);
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
        updatePersonalDetails,
        updateAcademicDetails,
        addSkillTag,
        removeSkillTag,
        setFiroBAnswer,
        setCustomAnswer,
        completeFiroB,
        completeCustom,
        resetAssessment,
        getCareerById
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
