import { FiroBSynthesisRequest, FiroBSynthesisResult } from './firoBSchema.js';

/**
 * Generates a high-quality deterministic fallback interpretation based on the 6 FIRO-B scores.
 * Used when OpenAI API key is not configured, unreachable, or returns an invalid output.
 */
export function generateFiroBFallback(input: FiroBSynthesisRequest): FiroBSynthesisResult {
  const { EI, WI, EC, WC, EA, WA } = input.firoBScores;

  // Inclusion Pattern Analysis (EI & WI: max 54 each)
  const isHighEI = EI >= 27;
  const isHighWI = WI >= 27;
  let inclusionSummary = '';
  let inclusionStrength = '';
  let inclusionDev = '';

  if (isHighEI && isHighWI) {
    inclusionSummary = 'Your profile indicates a strong desire to both initiate social contact and be included in team activities.';
    inclusionStrength = 'High social energy, team building, and proactive stakeholder engagement.';
    inclusionDev = 'Ensure dedicated deep-work periods to avoid over-committing to collaborative meetings.';
  } else if (isHighEI && !isHighWI) {
    inclusionSummary = 'You enjoy reaching out to others and driving group engagement on your own terms.';
    inclusionStrength = 'Proactive networking, initiative in team outreach, and self-directed group alignment.';
    inclusionDev = 'Be mindful of team members who may prefer quieter, structured communication styles.';
  } else if (!isHighEI && isHighWI) {
    inclusionSummary = 'You value being invited and recognized as a core team member while maintaining a selective outreach style.';
    inclusionStrength = 'Strong loyalty to established teams, thoughtful participation when invited.';
    inclusionDev = 'Practice taking the initiative in introducing ideas or reaching out to new collaborators.';
  } else {
    inclusionSummary = 'Your results suggest a preference for autonomous work environments with focused, low-noise interaction.';
    inclusionStrength = 'High independent focus, minimal susceptibility to groupthink, self-reliant execution.';
    inclusionDev = 'Actively communicate progress to keep team leads informed without relying on frequent check-ins.';
  }

  // Control Pattern Analysis (EC & WC)
  const isHighEC = EC >= 27;
  const isHighWC = WC >= 27;
  let controlSummary = '';
  let controlStrength = '';
  let controlDev = '';

  if (isHighEC && isHighWC) {
    controlSummary = 'You balance decisive leadership with a strong appreciation for clear organizational guidelines.';
    controlStrength = 'Adaptable management style, comfortable taking charge while adhering to strategic direction.';
    controlDev = 'Clarify decision-making boundaries early to avoid role ambiguity with senior mentors.';
  } else if (isHighEC && !isHighWC) {
    controlSummary = 'Your profile indicates a clear preference for high autonomy, strategic direction, and decision ownership.';
    controlStrength = 'Strong executive presence, ownership of outcomes, and natural problem-solving initiative.';
    controlDev = 'Delegate operational details effectively to avoid micro-managing team workflows.';
  } else if (!isHighEC && isHighWC) {
    controlSummary = 'You excel in structured environments with clear procedures, mentorship, and defined boundaries.';
    controlStrength = 'High operational discipline, thorough compliance with standards, and reliable execution.';
    controlDev = 'Build confidence in stepping into decision-making roles when unexpected ambiguity arises.';
  } else {
    controlSummary = 'Your scores suggest a flexible approach to authority, preferring peer collaboration over strict hierarchy.';
    controlStrength = 'Egoless collaboration, adaptability to horizontal team structures, low friction with peers.';
    controlDev = 'Establish personal milestone tracking to maintain velocity without external supervision.';
  }

  // Affection Pattern Analysis (EA & WA)
  const isHighEA = EA >= 27;
  const isHighWA = WA >= 27;
  let affectionSummary = '';
  let affectionStrength = '';
  let affectionDev = '';

  if (isHighEA && isHighWA) {
    affectionSummary = 'You foster warm, empathetic connections and thrive in high-trust, psychologically safe environments.';
    affectionStrength = 'Empathetic team leadership, deep relational trust, and positive feedback facilitation.';
    affectionDev = 'Maintain objective boundaries during tough performance feedback or critical evaluations.';
  } else if (isHighEA && !isHighWA) {
    affectionSummary = 'You openly express support and appreciation for teammates while maintaining comfortable personal distance.';
    affectionStrength = 'Generous praise, uplifting team morale, and supportive mentorship.';
    affectionDev = 'Ensure your enthusiasm is paired with actionable, constructive analytical feedback.';
  } else if (!isHighEA && isHighWA) {
    affectionSummary = 'You appreciate genuine validation and supportive feedback from colleagues and leaders.';
    affectionStrength = 'Receptive to constructive mentorship, strong appreciation for recognized effort.';
    affectionDev = 'Practice self-affirmation to stay motivated even in fast-paced or low-feedback environments.';
  } else {
    affectionSummary = 'Your profile demonstrates an objective, professional work style centered on task clarity and logic.';
    affectionStrength = 'Objective decision-making, task-focused communication, resilience in high-pressure settings.';
    affectionDev = 'Remember to celebrate team milestones and acknowledge peer contributions explicitly.';
  }

  // Top career titles context
  const topCareersText = input.careerResults && input.careerResults.length > 0
    ? input.careerResults.slice(0, 3).map(c => c.title || c.careerId).filter(Boolean).join(', ')
    : 'data, engineering, and technology domains';

  const archetypeTitle = input.archetype?.title || input.archetype?.name || 'Systems Pioneer';

  const identityHeadline = isHighEC
    ? (isHighEI ? 'Strategic Team Catalyst' : 'Autonomous Systems Architect')
    : (isHighEA ? 'Empathetic Collaborative Engineer' : 'Empirical Analytical Specialist');

  const identitySummary = `You combine ${isHighEC ? 'decisive problem ownership' : 'structured domain discipline'} with ${isHighEI ? 'active collaborative engagement' : 'focused independent execution'}. Your FIRO-B pattern indicates an approach to work that values ${isHighEA ? 'relational trust and team harmony' : 'objective metrics and logical clarity'}.`;

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
      explanation: `Your interpersonal scores (EI:${EI}, WI:${WI}, EC:${EC}, WC:${WC}, EA:${EA}, WA:${WA}) indicate why you resonate with the ${archetypeTitle} persona. Your preference for ${isHighEC ? 'autonomy and outcome ownership' : 'structured frameworks and peer collaboration'} aligns directly with the core characteristics of this archetype.`,
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
      collaborationStyle: isHighEI || isHighEA ? 'Collaborative and supportive squad dynamic with frequent milestone check-ins.' : 'Autonomous execution with asynchronous progress updates.',
      communicationStyle: isHighEC ? 'Direct, objective, and outcome-oriented communication.' : 'Structured, clear, and consensus-oriented communication.',
      responsibilityStyle: isHighEC ? 'High outcome ownership with preference for strategic accountability.' : 'Shared team responsibility with defined operational boundaries.'
    },
    careerGuidance: {
      summary: `Your interpersonal scores suggest high compatibility with environments requiring ${isHighEC ? 'strategic decision-making and ownership' : 'collaborative execution and structured domain mastery'}.`,
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

