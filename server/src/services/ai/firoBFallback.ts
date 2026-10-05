import { FiroBSynthesisRequest, FiroBSynthesisResult } from './firoBSchema.js';

type ScoreBand = 'Lower' | 'Moderate' | 'Higher';

const getScoreBand = (score: number): ScoreBand =>
  score >= 67 ? 'Higher' : score >= 34 ? 'Moderate' : 'Lower';

const describeGap = (gap: number): string => {
  if (gap > 0) return 'You report expressing this behavior more than you want it from others.';
  if (gap < 0) return 'You report wanting this behavior from others more than you report expressing it.';
  return 'Your expressed and wanted scores are equal.';
};

function describeDomain(
  expressedLabel: string,
  wantedLabel: string,
  expressedScore: number,
  wantedScore: number,
  context: string
) {
  const expressedBand = getScoreBand(expressedScore);
  const wantedBand = getScoreBand(wantedScore);
  const gap = expressedScore - wantedScore;
  const formattedGap = `${gap > 0 ? '+' : ''}${gap}`;

  return {
    summary: `${expressedLabel} is in the ${expressedBand} project band (${expressedScore}/100), while ${wantedLabel} is in the ${wantedBand} band (${wantedScore}/100). The expressed–wanted gap is ${formattedGap} points. ${describeGap(gap)}`,
    strength: `The ${expressedLabel.toLowerCase()} score provides a ${expressedBand.toLowerCase()}-band signal about your reported approach to ${context}.`,
    developmentArea: `Discuss how to align your expressed and wanted preferences for ${context} when starting a new team or project.`
  };
}

/**
 * Generates a deterministic interpretation of CareerCompass's normalized FIRO-B-based scores.
 * Used when OpenAI is unavailable or returns output that does not match the response schema.
 */
export function generateFiroBFallback(input: FiroBSynthesisRequest): FiroBSynthesisResult {
  const { EI, WI, EC, WC, EA, WA } = input.firoBScores;
  const inclusion = describeDomain('Expressed Inclusion', 'Wanted Inclusion', EI, WI, 'group involvement and collaboration');
  const control = describeDomain('Expressed Control', 'Wanted Control', EC, WC, 'responsibility, autonomy, and guidance');
  const affection = describeDomain('Expressed Affection', 'Wanted Affection', EA, WA, 'warmth, feedback, and interpersonal connection');
  const strengths = [inclusion.strength, control.strength, affection.strength];
  const developmentAreas = [inclusion.developmentArea, control.developmentArea, affection.developmentArea];
  const topCareersText = input.careerResults.length > 0
    ? input.careerResults.slice(0, 3).map(career => career.title || career.careerId).filter(Boolean).join(', ')
    : 'the career areas already identified by CareerCompass';
  const archetypeTitle = input.archetype?.title || input.archetype?.name || 'your existing career archetype';
  const band = getScoreBand;

  return {
    firoBInterpretation: {
      overallProfile: `Your CareerCompass FIRO-B-based scores summarize reported preferences across group involvement, responsibility, and interpersonal connection. They can be considered alongside your existing ${archetypeTitle} archetype.`,
      interpersonalStyle: `Inclusion: expressed ${band(EI)}, wanted ${band(WI)} (gap ${EI - WI > 0 ? '+' : ''}${EI - WI}); Control: expressed ${band(EC)}, wanted ${band(WC)} (gap ${EC - WC > 0 ? '+' : ''}${EC - WC}); Affection: expressed ${band(EA)}, wanted ${band(WA)} (gap ${EA - WA > 0 ? '+' : ''}${EA - WA}).`,
      workStyle: 'Use these project-level bands as prompts for discussing preferred collaboration, autonomy, guidance, and communication; they are descriptive, not diagnostic.'
    },
    identityInsight: {
      headline: 'Interpersonal Work-Style Snapshot',
      summary: 'The three expressed/wanted pairs describe how you report approaching group involvement, responsibility, and interpersonal connection. Consider them together rather than treating one score as a complete description.'
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
      explanation: `These normalized FIRO-B-based preferences add interpersonal context to the already-derived ${archetypeTitle}; they do not recalculate the archetype or alter career matches.`,
      workplaceStrengths: strengths,
      developmentAreas
    },
    keyStrengths: strengths,
    developmentAreas,
    workEnvironmentFit: {
      preferredEnvironment: `Explore environments in ${topCareersText} that can accommodate the expressed and wanted preferences shown in your three domain pairs.`,
      collaborationStyle: `Your inclusion scores are ${band(EI)} for expressed and ${band(WI)} for wanted inclusion.`,
      communicationStyle: `Your affection scores are ${band(EA)} for expressed and ${band(WA)} for wanted affection.`,
      responsibilityStyle: `Your control scores are ${band(EC)} for expressed and ${band(WC)} for wanted control.`
    },
    careerGuidance: {
      summary: `Use these preferences as reflection points when exploring ${topCareersText}; CareerCompass's existing deterministic engine remains the source of career matches and rankings.`,
      recommendedWorkCharacteristics: [
        'Clear expectations about collaboration and individual focus',
        'Responsibility and guidance practices that fit your expressed/wanted control pattern',
        'Communication and feedback practices that fit your interpersonal preferences'
      ]
    },
    actionableSuggestions: developmentAreas
  };
}
