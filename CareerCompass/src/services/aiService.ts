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
  const band = (score: number) => score >= 67 ? 'Higher' : score >= 34 ? 'Moderate' : 'Lower';
  const gapDescription = (gap: number) => gap > 0
    ? 'You report expressing this behavior more than you want it from others.'
    : gap < 0
      ? 'You report wanting this behavior from others more than you report expressing it.'
      : 'Your expressed and wanted scores are equal.';
  const describeDomain = (
    expressedLabel: string,
    wantedLabel: string,
    expressedScore: number,
    wantedScore: number,
    setting: string
  ) => {
    const gap = expressedScore - wantedScore;
    const direction = gap > 0 ? '+' : '';
    return {
      summary: `${expressedLabel} is ${band(expressedScore)} (${expressedScore}/100), while ${wantedLabel} is ${band(wantedScore)} (${wantedScore}/100). The expressed–wanted gap is ${direction}${gap} points. ${gapDescription(gap)}`,
      strength: `The ${expressedLabel.toLowerCase()} score is in the ${band(expressedScore).toLowerCase()} project band, offering a useful signal about your preferred approach to ${setting}.`,
      developmentArea: `Use your ${expressedLabel.toLowerCase()} and ${wantedLabel.toLowerCase()} pattern to agree on a workable approach to ${setting}.`
    };
  };

  const inclusion = describeDomain('Expressed Inclusion', 'Wanted Inclusion', EI, WI, 'group involvement and collaboration');
  const control = describeDomain('Expressed Control', 'Wanted Control', EC, WC, 'responsibility, autonomy, and guidance');
  const affection = describeDomain('Expressed Affection', 'Wanted Affection', EA, WA, 'warmth, feedback, and interpersonal connection');

  const topCareersText = payload.careerResults && payload.careerResults.length > 0
    ? payload.careerResults.slice(0, 3).map(c => c.title || c.id || c.careerId).filter(Boolean).join(', ')
    : 'specialized engineering and analytical domains';

  const archetypeTitle = payload.archetype?.title || payload.archetype?.name || 'Systems Pioneer';
  const strengths = [inclusion.strength, control.strength, affection.strength];
  const developmentAreas = [inclusion.developmentArea, control.developmentArea, affection.developmentArea];

  return {
    firoBInterpretation: {
      overallProfile: `Your CareerCompass FIRO-B-based scores provide a descriptive view of expressed and wanted interpersonal preferences alongside your ${archetypeTitle} archetype.`,
      interpersonalStyle: `Inclusion ${band(EI)}/${band(WI)} (gap ${EI - WI > 0 ? '+' : ''}${EI - WI}); Control ${band(EC)}/${band(WC)} (gap ${EC - WC > 0 ? '+' : ''}${EC - WC}); Affection ${band(EA)}/${band(WA)} (gap ${EA - WA > 0 ? '+' : ''}${EA - WA}).`,
      workStyle: `Use these project-level score bands to discuss preferred collaboration, responsibility, guidance, and communication; they are descriptive rather than diagnostic.`
    },
    identityInsight: {
      headline: 'Interpersonal Work-Style Snapshot',
      summary: `The three expressed/wanted pairs show how you report approaching group involvement, responsibility, and interpersonal connection. The results can inform career reflection alongside your profile and existing career matches.`
    },
    interpersonalProfile: {
      inclusion: inclusion.summary,
      control: control.summary,
      affection: affection.summary
    },
    dimensions: {
      inclusion,
      control,
      affection
    },
    archetypeInsight: {
      explanation: `The six normalized scores describe interpersonal preferences that may be considered alongside the already-derived ${archetypeTitle} archetype. They do not recalculate that archetype or change career matches.`,
      workplaceStrengths: strengths,
      developmentAreas
    },
    keyStrengths: strengths,
    developmentAreas,
    workEnvironmentFit: {
      preferredEnvironment: `Consider environments related to ${topCareersText} that can accommodate your reported preferences across collaboration, guidance, and connection.`,
      collaborationStyle: `Expressed inclusion is in the ${band(EI).toLowerCase()} project band and wanted inclusion is in the ${band(WI).toLowerCase()} band.`,
      communicationStyle: `Expressed affection is in the ${band(EA).toLowerCase()} project band and wanted affection is in the ${band(WA).toLowerCase()} band.`,
      responsibilityStyle: `Expressed control is in the ${band(EC).toLowerCase()} project band and wanted control is in the ${band(WC).toLowerCase()} band.`
    },
    careerGuidance: {
      summary: `Use the expressed and wanted patterns as discussion points when considering roles and teams related to ${topCareersText}; career matches remain determined by the existing CareerCompass engine.`,
      recommendedWorkCharacteristics: [
        'Clear expectations around collaboration and individual focus',
        'Responsibility and guidance suited to your expressed/wanted control pattern',
        'Communication and feedback practices aligned with your interpersonal preferences'
      ]
    },
    actionableSuggestions: [
      inclusion.developmentArea,
      control.developmentArea,
      affection.developmentArea
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
