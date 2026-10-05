export interface FiroBQuestion {
  id: number;
  text: string;
  category: 'EI' | 'WI' | 'EC' | 'WC' | 'EA' | 'WA';
  categoryLabel: string;
}

export const FIRO_B_QUESTIONS: FiroBQuestion[] = [
  // Expressed Inclusion (1-9)
  { id: 1, text: "I try to be with people and invite them to group activities.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 2, text: "I join social organizations and student clubs.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 3, text: "I take initiative to introduce myself to new acquaintances.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 4, text: "I prefer working in teams rather than working individually.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 5, text: "I organize casual hangouts or study sessions for peers.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 6, text: "I actively ensure that quiet team members are included in discussions.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 7, text: "I seek out social gatherings during my free time.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 8, text: "I communicate frequently with colleagues and friends throughout the day.", category: 'EI', categoryLabel: 'Expressed Inclusion' },
  { id: 9, text: "I make an effort to maintain contact with old classmates.", category: 'EI', categoryLabel: 'Expressed Inclusion' },

  // Wanted Inclusion (10-18)
  { id: 10, text: "I like people to invite me to join their events and projects.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 11, text: "I feel appreciated when peers ask for my involvement in group efforts.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 12, text: "I prefer to be included in group emails and decision threads.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 13, text: "I enjoy being recognized as an active member of my organization.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 14, text: "I feel disappointed if I am left out of team social gatherings.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 15, text: "I like when colleagues reach out to check in on me.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 16, text: "I want others to actively seek my attendance at meetings.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 17, text: "I value being welcomed warmly into new work environments.", category: 'WI', categoryLabel: 'Wanted Inclusion' },
  { id: 18, text: "I feel energized when included in collaborative brainstorming.", category: 'WI', categoryLabel: 'Wanted Inclusion' },

  // Expressed Control (19-27)
  { id: 19, text: "I try to take charge and lead group projects.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 20, text: "I set high performance goals and timelines for my team.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 21, text: "I like to delegate tasks and coordinate responsibility among peers.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 22, text: "I step up to resolve conflicts and make final project decisions.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 23, text: "I prefer guiding the direction of a team strategy.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 24, text: "I advocate strongly for my ideas during group discussions.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 25, text: "I establish clear guidelines and structure for complex tasks.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 26, text: "I feel comfortable taking full accountability for outcomes.", category: 'EC', categoryLabel: 'Expressed Control' },
  { id: 27, text: "I like to manage project workflows from start to finish.", category: 'EC', categoryLabel: 'Expressed Control' },

  // Wanted Control (28-36)
  { id: 28, text: "I prefer clear instructions and guidance from experienced leaders.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 29, text: "I like having a mentor tell me how best to approach a problem.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 30, text: "I feel more comfortable when others define the main rules and boundaries.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 31, text: "I appreciate structured environments with well-defined procedures.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 32, text: "I prefer to consult supervisors before making major alterations to a plan.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 33, text: "I look to team leads to resolve technical deadlocks.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 34, text: "I perform best when goals and criteria are clearly specified.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 35, text: "I value receiving direct feedback and direction on my work.", category: 'WC', categoryLabel: 'Wanted Control' },
  { id: 36, text: "I prefer executing well-crafted plans over defining strategy from scratch.", category: 'WC', categoryLabel: 'Wanted Control' },

  // Expressed Affection (37-45)
  { id: 37, text: "I express personal warmth, empathy, and care to my teammates.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 38, text: "I share my personal feelings and experiences openheartedly.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 39, text: "I offer emotional encouragement to peers when they face stress.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 40, text: "I build close, personal friendships with people I work with.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 41, text: "I express heartfelt gratitude when colleagues assist me.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 42, text: "I openly praise teammates for their strengths and achievements.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 43, text: "I prefer workplace environments that feel friendly and warm.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 44, text: "I check in on team members' personal well-being regularly.", category: 'EA', categoryLabel: 'Expressed Affection' },
  { id: 45, text: "I am comfortable discussing non-work topics with colleagues.", category: 'EA', categoryLabel: 'Expressed Affection' },

  // Wanted Affection (46-54)
  { id: 46, text: "I want others to treat me with warmth and personal friendliness.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 47, text: "I value when teammates share personal confidences with me.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 48, text: "I like receiving genuine positive affirmation for my contributions.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 49, text: "I hope colleagues view me as a trustworthy, loyal friend.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 50, text: "I feel motivated when team members show genuine care for my growth.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 51, text: "I appreciate when others confide in me regarding their challenges.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 52, text: "I prefer working with people who demonstrate empathy and compassion.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 53, text: "I value deep, meaningful one-on-one professional relationships.", category: 'WA', categoryLabel: 'Wanted Affection' },
  { id: 54, text: "I feel most fulfilled in supportive, high-trust environments.", category: 'WA', categoryLabel: 'Wanted Affection' }
];

export const LIKERT_OPTIONS = [
  { value: 6, label: "Strongly Agree" },
  { value: 5, label: "Agree" },
  { value: 4, label: "Slightly Agree" },
  { value: 3, label: "Slightly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly Disagree" }
];
