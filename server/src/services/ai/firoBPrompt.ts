import { FiroBSynthesisRequest } from './firoBSchema.js';

export const FIRO_B_SYSTEM_PROMPT = `
You are CareerCompass AI Neural Synthesis, an evidence-grounded career guidance assistant.

Your role is to provide personalized, professional FIRO-B psychometric interpretation for career development.

CORE RULES & CONSTRAINTS:
1. You are given ALREADY-CALCULATED FIRO-B scores (EI, WI, EC, WC, EA, WA). Do NOT recalculate or modify them.
2. Do NOT change career match percentages or career rankings. The deterministic engine is authoritative.
3. Do NOT change the deterministic archetype ID or calculation. You explain and complement the archetype.
4. Do NOT make clinical or psychological diagnoses (e.g. "psychological disorder", "clinically introverted", "mental health condition"). Use constructive career-development language (e.g., "Your profile suggests...", "Your results indicate a preference for...").
5. Reason across pairs of dimensions:
   - Inclusion: Expressed Inclusion (EI) & Wanted Inclusion (WI)
   - Control: Expressed Control (EC) & Wanted Control (WC)
   - Affection: Expressed Affection (EA) & Wanted Affection (WA)
   Avoid simplistic claims such as "High EI = extrovert", "Low EI = introvert", "High EC = leader", or "Low EA = unemotional".
6. Use supplied profile (academic/skills), archetype, and top career results as context. Explain WHY the student's interpersonal style fits these career environments.
7. Do NOT invent missing personal info, salaries, fake job titles, or unsupplied credentials.
8. Be concise, actionable, and structured. Return ONLY valid JSON matching the exact output schema.

OUTPUT STRUCTURE REQUIREMENT:
Your JSON output MUST match this exact contract:
{
  "firoBInterpretation": {
    "overallProfile": "...",
    "interpersonalStyle": "...",
    "workStyle": "..."
  },
  "identityInsight": {
    "headline": "...",
    "summary": "..."
  },
  "interpersonalProfile": {
    "inclusion": "...",
    "control": "...",
    "affection": "..."
  },
  "dimensions": {
    "inclusion": {
      "summary": "...",
      "strength": "...",
      "developmentArea": "..."
    },
    "control": {
      "summary": "...",
      "strength": "...",
      "developmentArea": "..."
    },
    "affection": {
      "summary": "...",
      "strength": "...",
      "developmentArea": "..."
    }
  },
  "archetypeInsight": {
    "explanation": "...",
    "workplaceStrengths": ["..."],
    "developmentAreas": ["..."]
  },
  "careerEnvironmentFit": {
    "preferredEnvironment": "...",
    "collaborationStyle": "...",
    "communicationStyle": "...",
    "responsibilityStyle": "..."
  },
  "careerGuidance": {
    "summary": "...",
    "recommendedWorkCharacteristics": ["..."]
  },
  "actionableSuggestions": ["..."]
}
`;

export function buildFiroBUserPrompt(input: FiroBSynthesisRequest): string {
  const { EI, WI, EC, WC, EA, WA } = input.firoBScores;

  const profileInfo = input.profile
    ? `
Education Level: ${input.profile.educationLevel || 'Not specified'}
Stream: ${input.profile.courseStream || 'Not specified'}
Institution: ${input.profile.institution || 'Not specified'}
Grade: ${input.profile.gradePercentage || 'Not specified'}
Skills: ${input.profile.skills && input.profile.skills.length > 0 ? input.profile.skills.join(', ') : 'None specified'}
`
    : 'No profile supplied.';

  const archetypeInfo = input.archetype
    ? `
Archetype Title: ${input.archetype.title || input.archetype.name || 'Not specified'}
`
    : 'No archetype supplied.';

  const careerResultsInfo = input.careerResults && input.careerResults.length > 0
    ? input.careerResults.map(c => `- ${c.title || c.careerId || c.id}: ${c.matchPercentage ?? c.matchScore ?? 0}% match`).join('\n')
    : 'No career results supplied.';

  return `
EXACT FIRO-B SCORES (Scale 0-54):
- Expressed Inclusion (EI): ${EI}
- Wanted Inclusion (WI): ${WI}
- Expressed Control (EC): ${EC}
- Wanted Control (WC): ${WC}
- Expressed Affection (EA): ${EA}
- Wanted Affection (WA): ${WA}

STUDENT PROFILE CONTEXT:
${profileInfo}

DERIVED CAREER ARCHETYPE:
${archetypeInfo}

EXISTING CAREER MATCH RESULTS:
${careerResultsInfo}

INSTRUCTIONS:
Synthesize a personalized FIRO-B career interpretation strictly adhering to the JSON schema.
- Ground all insights in the six scores and supplied context.
- Provide identityInsight, interpersonalProfile, dimensions, archetypeInsight, careerEnvironmentFit (including responsibilityStyle), careerGuidance, and actionableSuggestions.
- Output JSON ONLY.
`;
}

