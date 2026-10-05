export interface CareerArchetype {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  strengths: string[];
  workplaceVibe: string;
  recommendedRoleTitle: string;
  colorScheme: {
    primary: string;
    secondary: string;
    bgAccent: string;
  };
}

export const ARCHETYPES: Record<string, CareerArchetype> = {
  'strategic-architect': {
    id: 'strategic-architect',
    title: 'The Strategic Systems Architect',
    badge: 'Analytical • High Autonomy',
    tagline: 'You naturally decompose complex multi-layered problems into elegant, scalable systems.',
    description: 'You thrive when given high autonomy to design solutions from first principles. Your interpersonal profile demonstrates deliberate control and clear boundaries, making you exceptional at strategic decision-making and architectural foresight.',
    strengths: ['Systems Thinking', 'Abstract Problem Solving', 'High Autonomy Execution', 'Architectural Modeling'],
    workplaceVibe: 'Deep-work research labs, technical architecture squads, high-ownership engineering pods.',
    recommendedRoleTitle: 'AI/ML Solutions Architect',
    colorScheme: {
      primary: '#1E3A34',
      secondary: '#C86D51',
      bgAccent: '#F3F1E7'
    }
  },
  'collaborative-catalyst': {
    id: 'collaborative-catalyst',
    title: 'The Collaborative Innovation Catalyst',
    badge: 'High Affection • Agile Leadership',
    tagline: 'You bridge the gap between human empathy, team velocity, and ambitious product vision.',
    description: 'You possess high Wanted & Expressed Affection and Inclusion, making you an empathetic force multiplier in cross-functional teams. You excel at translating ambiguous user desires into concrete, high-impact product experiences.',
    strengths: ['Cross-Functional Alignment', 'Product Sense', 'Empathetic Leadership', 'Agile Facilitation'],
    workplaceVibe: 'High-growth product squads, user research labs, customer-centric innovation hubs.',
    recommendedRoleTitle: 'Technical Product Lead',
    colorScheme: {
      primary: '#1E3A34',
      secondary: '#E07A5F',
      bgAccent: '#FBF9F5'
    }
  },
  'data-strategist': {
    id: 'data-strategist',
    title: 'The Quantitative Data Pioneer',
    badge: 'Precision • Empirical Logic',
    tagline: 'You transform raw ambiguity into definitive, high-confidence empirical insights.',
    description: 'Your dominant logic and analytical drivers combined with balanced control preferences mean you rely on proof over assumptions. You love discovering hidden patterns in datasets to drive executive decisions.',
    strengths: ['Statistical Modeling', 'Hypothesis Testing', 'Data Storytelling', 'Algorithmic Optimization'],
    workplaceVibe: 'Data analytics divisions, quant labs, strategic intelligence & business operations.',
    recommendedRoleTitle: 'Quantitative Data Strategist',
    colorScheme: {
      primary: '#1E3A34',
      secondary: '#3D5A80',
      bgAccent: '#EEF4F8'
    }
  },
  'creative-builder': {
    id: 'creative-builder',
    title: 'The Creative Experience Technologist',
    badge: 'Visual Craft • Human-Centered',
    tagline: 'You craft delightful, visually engaging interfaces that make technology feel invisible.',
    description: 'You blend aesthetic intuition with technological curiosity. Your interpersonal style values authentic personal expression and collaborative design sprints.',
    strengths: ['Interaction Design', 'Frontend Craft', 'Design Systems', 'Visual Storytelling'],
    workplaceVibe: 'Design studios, frontend platform teams, brand tech labs.',
    recommendedRoleTitle: 'Design Systems & UI Engineer',
    colorScheme: {
      primary: '#1E3A34',
      secondary: '#D4A373',
      bgAccent: '#FAEDCD'
    }
  }
};

/**
 * Derives the best matching archetype from FIRO-B and Custom Trait scores
 */
export function calculateArchetype(
  firoB: { EI: number; WI: number; EC: number; WC: number; EA: number; WA: number },
  traits: { Analytical: number; Creative: number; Leadership: number; Technical: number; People: number }
): CareerArchetype {
  // If high Analytical + Technical
  if (traits.Analytical >= traits.Creative && traits.Analytical >= traits.People) {
    if (firoB.EC >= 35) {
      return ARCHETYPES['strategic-architect'];
    }
    return ARCHETYPES['data-strategist'];
  }
  
  // If high Creative
  if (traits.Creative > traits.Analytical && traits.Creative >= traits.Leadership) {
    return ARCHETYPES['creative-builder'];
  }

  // Default / Collaborative Leadership
  return ARCHETYPES['collaborative-catalyst'];
}
