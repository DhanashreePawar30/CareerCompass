export interface FiroBInterpretation {
  overallProfile: string;
  interpersonalStyle: string;
  workStyle: string;
}

export interface DimensionDetail {
  summary: string;
  strength: string;
  developmentArea: string;
}

export interface FiroBDimensions {
  inclusion: DimensionDetail;
  control: DimensionDetail;
  affection: DimensionDetail;
}

export interface WorkEnvironmentFit {
  preferredEnvironment: string;
  collaborationStyle: string;
  communicationStyle: string;
}

export interface CareerGuidance {
  summary: string;
  recommendedWorkCharacteristics: string[];
}

export interface FiroBSynthesisResult {
  firoBInterpretation: FiroBInterpretation;
  dimensions: FiroBDimensions;
  keyStrengths: string[];
  developmentAreas: string[];
  workEnvironmentFit: WorkEnvironmentFit;
  careerGuidance: CareerGuidance;
  actionableSuggestions: string[];
}

export interface FiroBSynthesisRequestPayload {
  firoBScores: {
    EI: number;
    WI: number;
    EC: number;
    WC: number;
    EA: number;
    WA: number;
  };
  profile?: {
    educationLevel?: string;
    courseStream?: string;
    institution?: string;
    gradePercentage?: string;
    skills?: string[];
  };
  archetype?: {
    id?: string;
    name?: string;
    title?: string;
  };
  careerResults?: Array<{
    careerId?: string;
    id?: string;
    title?: string;
    matchPercentage?: number;
    matchScore?: number;
  }>;
}

/**
 * Client-side deterministic fallback synthesizer if network connection to backend server is unavailable.
 */
function generateClientFallback(payload: FiroBSynthesisRequestPayload): FiroBSynthesisResult {
  const { EI, WI, EC, WC, EA, WA } = payload.firoBScores;

  const isHighEI = EI >= 27;
  const isHighWI = WI >= 27;
  const isHighEC = EC >= 27;
  const isHighWC = WC >= 27;
  const isHighEA = EA >= 27;
  const isHighWA = WA >= 27;

  const topCareersText = payload.careerResults && payload.careerResults.length > 0
    ? payload.careerResults.slice(0, 3).map(c => c.title || c.id || c.careerId).filter(Boolean).join(', ')
    : 'specialized engineering and analytical domains';

  const archetypeTitle = payload.archetype?.title || payload.archetype?.name || 'Systems Pioneer';

  return {
    firoBInterpretation: {
      overallProfile: `Your FIRO-B profile indicates a balanced interpersonal orientation aligned with ${archetypeTitle}. You combine empirical problem-solving with tailored workplace engagement.`,
      interpersonalStyle: `Inclusion: ${EI > WI ? 'Proactive' : 'Selective'}, Control: ${EC > WC ? 'Autonomous/Directing' : 'Structured/Guiding'}, Affection: ${EA > WA ? 'Expressive' : 'Objective'}.`,
      workStyle: `You perform best when project expectations are clear and communication is grounded in direct, evidence-based metrics.`
    },
    dimensions: {
      inclusion: {
        summary: isHighEI ? 'High drive to initiate team activities and social engagement.' : 'Selective, focused approach to team interaction with emphasis on deep-work autonomy.',
        strength: isHighEI ? 'Proactive networking and team cohesion.' : 'High independent focus and minimal susceptibility to groupthink.',
        developmentArea: isHighEI ? 'Ensure dedicated focus time to avoid meeting fatigue.' : 'Initiate communication earlier during team sprints.'
      },
      control: {
        summary: isHighEC ? 'Preference for high autonomy, strategic vision, and decision ownership.' : 'Value clear guidelines, mentorship, and defined operational boundaries.',
        strength: isHighEC ? 'Strategic ownership, clarity of direction, and executive initiative.' : 'Operational discipline, procedural compliance, and low friction with leadership.',
        developmentArea: isHighEC ? 'Delegate operational tasks effectively to empower peers.' : 'Build confidence in stepping into decision-making roles.'
      },
      affection: {
        summary: isHighEA ? 'Fosters warm, empathetic connections and psychologically safe teams.' : 'Objective, task-focused professional orientation centered on logical output.',
        strength: isHighEA ? 'Empathetic team leadership and trust building.' : 'Objective decision-making and resilience under pressure.',
        developmentArea: isHighEA ? 'Maintain objective boundaries during tough performance reviews.' : 'Acknowledge peer contributions explicitly.'
      }
    },
    keyStrengths: [
      isHighEC ? 'Strategic ownership and decisive execution' : 'High operational discipline and procedural accuracy',
      isHighEI ? 'Proactive team building and communication' : 'Focused individual execution and deep-work stamina',
      isHighEA ? 'Empathetic trust building and collaboration' : 'Objective, evidence-grounded decision making'
    ],
    developmentAreas: [
      isHighEC ? 'Empower peers by delegating sub-tasks' : 'Step up to resolve technical deadlocks independently',
      isHighEI ? 'Protect calendar focus blocks for execution' : 'Proactively communicate milestone status to team leads',
      isHighEA ? 'Balance warm empathy with firm performance standards' : 'Explicitly celebrate team wins and peer contributions'
    ],
    workEnvironmentFit: {
      preferredEnvironment: `Environments that balance focus time with structured collaborative milestones, particularly in ${topCareersText}.`,
      collaborationStyle: isHighEI || isHighEA ? 'Collaborative squad dynamic with active peer alignment.' : 'Autonomous execution with asynchronous milestone check-ins.',
      communicationStyle: isHighEC ? 'Direct, objective, and outcome-oriented communication.' : 'Structured, clear, and consensus-oriented communication.'
    },
    careerGuidance: {
      summary: `Your interpersonal profile aligns strongly with work environments requiring ${isHighEC ? 'strategic decision-making and ownership' : 'collaborative execution and domain mastery'}.`,
      recommendedWorkCharacteristics: [
        'Clear accountability structures and objective success metrics',
        'Cross-functional alignment with opportunities for skill growth',
        'Psychologically safe spaces that value empirical rigor and innovation'
      ]
    },
    actionableSuggestions: [
      'Define explicit project deliverables and communication channels at the start of new initiatives.',
      'Schedule dedicated focus blocks on your calendar to balance teamwork with deep analytical execution.',
      'Seek mentorship in areas where you want to expand your leadership or technical influence.'
    ]
  };
}

/**
 * Calls backend API POST /api/ai/firob-synthesis securely
 */
export async function fetchFiroBSynthesis(payload: FiroBSynthesisRequestPayload): Promise<FiroBSynthesisResult> {
  try {
    const response = await fetch('/api/ai/firob-synthesis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': payload.profile?.institution || 'user@careercompass.edu'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn(`[AI Service Client] HTTP ${response.status} from backend API. Using client fallback.`);
      return generateClientFallback(payload);
    }

    const data = await response.json();
    return data as FiroBSynthesisResult;
  } catch (err) {
    console.warn('[AI Service Client] Backend API connection failed. Using client fallback:', err);
    return generateClientFallback(payload);
  }
}
