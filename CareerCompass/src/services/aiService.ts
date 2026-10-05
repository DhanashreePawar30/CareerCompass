export interface FiroBInterpretation {
  overallProfile: string;
  interpersonalStyle: string;
  workStyle: string;
}

export interface IdentityInsight {
  headline: string;
  summary: string;
}

export interface InterpersonalProfile {
  inclusion: string;
  control: string;
  affection: string;
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

export interface ArchetypeInsight {
  explanation: string;
  workplaceStrengths: string[];
  developmentAreas: string[];
}

export interface WorkEnvironmentFit {
  preferredEnvironment: string;
  collaborationStyle: string;
  communicationStyle: string;
  responsibilityStyle: string;
}

export interface CareerGuidance {
  summary: string;
  recommendedWorkCharacteristics: string[];
}

export interface FiroBSynthesisResult {
  firoBInterpretation: FiroBInterpretation;
  identityInsight: IdentityInsight;
  interpersonalProfile: InterpersonalProfile;
  dimensions: FiroBDimensions;
  archetypeInsight: ArchetypeInsight;
  keyStrengths?: string[];
  developmentAreas?: string[];
  workEnvironmentFit: WorkEnvironmentFit;
  careerGuidance: CareerGuidance;
  actionableSuggestions: string[];
  /** 'openai' = real AI output; anything else is a deterministic fallback. */
  source?: 'openai' | 'fallback' | 'client-fallback';
  fallbackReason?: string;
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
  const isHighEC = EC >= 27;
  const isHighEA = EA >= 27;

  const topCareersText = payload.careerResults && payload.careerResults.length > 0
    ? payload.careerResults.slice(0, 3).map(c => c.title || c.id || c.careerId).filter(Boolean).join(', ')
    : 'specialized engineering and analytical domains';

  const archetypeTitle = payload.archetype?.title || payload.archetype?.name || 'Systems Pioneer';

  const inclusionSummary = isHighEI
    ? 'High drive to initiate team activities and social engagement.'
    : 'Selective, focused approach to team interaction with emphasis on deep-work autonomy.';

  const controlSummary = isHighEC
    ? 'Preference for high autonomy, strategic vision, and decision ownership.'
    : 'Value clear guidelines, mentorship, and defined operational boundaries.';

  const affectionSummary = isHighEA
    ? 'Fosters warm, empathetic connections and psychologically safe teams.'
    : 'Objective, task-focused professional orientation centered on logical output.';

  const identityHeadline = isHighEC
    ? (isHighEI ? 'Strategic Team Catalyst' : 'Autonomous Systems Architect')
    : (isHighEA ? 'Empathetic Collaborative Engineer' : 'Empirical Analytical Specialist');

  const identitySummary = `You combine ${isHighEC ? 'decisive problem ownership' : 'structured domain discipline'} with ${isHighEI ? 'active collaborative engagement' : 'focused independent execution'}. Your FIRO-B pattern indicates an approach to work that values ${isHighEA ? 'relational trust and team harmony' : 'objective metrics and logical clarity'}.`;

  const inclusionStrength = isHighEI ? 'Proactive networking and team cohesion.' : 'High independent focus and minimal susceptibility to groupthink.';
  const inclusionDev = isHighEI ? 'Ensure dedicated focus time to avoid meeting fatigue.' : 'Initiate communication earlier during team sprints.';

  const controlStrength = isHighEC ? 'Strategic ownership, clarity of direction, and executive initiative.' : 'Operational discipline, procedural compliance, and low friction with leadership.';
  const controlDev = isHighEC ? 'Delegate operational tasks effectively to empower peers.' : 'Build confidence in stepping into decision-making roles.';

  const affectionStrength = isHighEA ? 'Empathetic team leadership and trust building.' : 'Objective decision-making and resilience under pressure.';
  const affectionDev = isHighEA ? 'Maintain objective boundaries during tough performance reviews.' : 'Acknowledge peer contributions explicitly.';

  return {
    firoBInterpretation: {
      overallProfile: `Your FIRO-B profile indicates a balanced interpersonal orientation aligned with ${archetypeTitle}. You combine empirical problem-solving with tailored workplace engagement.`,
      interpersonalStyle: `Inclusion: ${EI > WI ? 'Proactive' : 'Selective'}, Control: ${EC > WC ? 'Autonomous/Directing' : 'Structured/Guiding'}, Affection: ${EA > WA ? 'Expressive' : 'Objective'}.`,
      workStyle: `You perform best when project expectations are clear and communication is grounded in direct, evidence-based metrics.`
    },
    identityInsight: {
      headline: identityHeadline,
      summary: identitySummary
    },
    interpersonalProfile: {
      inclusion: inclusionSummary,
      control: controlSummary,
      affection: affectionSummary
    },
    dimensions: {
      inclusion: {
        summary: inclusionSummary,
        strength: inclusionStrength,
        developmentArea: inclusionDev
      },
      control: {
        summary: controlSummary,
        strength: controlStrength,
        developmentArea: controlDev
      },
      affection: {
        summary: affectionSummary,
        strength: affectionStrength,
        developmentArea: affectionDev
      }
    },
    archetypeInsight: {
      explanation: `Your interpersonal profile (EI:${EI}, WI:${WI}, EC:${EC}, WC:${WC}, EA:${EA}, WA:${WA}) aligns naturally with your derived archetype ${archetypeTitle}. Your pattern highlights a preference for ${isHighEC ? 'outcome ownership and strategic autonomy' : 'structured process discipline and peer alignment'}.`,
      workplaceStrengths: [
        inclusionStrength,
        controlStrength,
        affectionStrength
      ],
      developmentAreas: [
        inclusionDev,
        controlDev,
        affectionDev
      ]
    },
    keyStrengths: [
      inclusionStrength,
      controlStrength,
      affectionStrength
    ],
    developmentAreas: [
      inclusionDev,
      controlDev,
      affectionDev
    ],
    workEnvironmentFit: {
      preferredEnvironment: `Environments that balance focus time with structured collaborative milestones, particularly in ${topCareersText}.`,
      collaborationStyle: isHighEI || isHighEA ? 'Collaborative squad dynamic with active peer alignment.' : 'Autonomous execution with asynchronous milestone check-ins.',
      communicationStyle: isHighEC ? 'Direct, objective, and outcome-oriented communication.' : 'Structured, clear, and consensus-oriented communication.',
      responsibilityStyle: isHighEC ? 'High outcome ownership with preference for strategic accountability.' : 'Shared team responsibility with defined operational boundaries.'
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
export async function fetchFiroBSynthesis(
  payload: FiroBSynthesisRequestPayload,
  userEmail?: string
): Promise<FiroBSynthesisResult> {
  try {
    const response = await fetch('/api/ai/firob-synthesis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(userEmail ? { 'X-User-Email': userEmail } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn(`[AI Service Client] HTTP ${response.status} from backend API. Using client fallback.`);
      return { ...generateClientFallback(payload), source: 'client-fallback', fallbackReason: `http_${response.status}` };
    }

    const data = (await response.json()) as FiroBSynthesisResult;
    if (data.source !== 'openai') {
      console.warn(`[AI Service Client] Backend served fallback synthesis (${data.fallbackReason ?? 'unknown reason'}).`);
    }
    return data;
  } catch (err) {
    console.warn('[AI Service Client] Backend API connection failed. Using client fallback:', err);
    return { ...generateClientFallback(payload), source: 'client-fallback', fallbackReason: 'network_error' };
  }
}

