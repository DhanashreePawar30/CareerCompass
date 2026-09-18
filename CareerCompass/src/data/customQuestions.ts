export interface CustomQuestion {
  id: number;
  section: 'Interests' | 'Aptitude' | 'Work Preferences';
  type: 'scenario' | 'aptitude' | 'preference';
  question: string;
  description?: string;
  options: {
    id: string;
    text: string;
    trait: string; // e.g. "Analytical", "Creative", "Leadership", "Technical", "People"
  }[];
}

export const CUSTOM_QUESTIONS: CustomQuestion[] = [
  // Section 1: Aptitude & Problem Solving (1-10)
  {
    id: 1,
    section: 'Aptitude',
    type: 'aptitude',
    question: "When presented with a massive dataset of customer behavior, what is your immediate instinct?",
    options: [
      { id: 'a', text: "Write scripts/SQL queries to extract patterns, anomalies, and statistical trends.", trait: "Analytical" },
      { id: 'b', text: "Design intuitive visual dashboards to tell a story about customer persona segments.", trait: "Creative" },
      { id: 'c', text: "Identify high-value operational strategies to boost revenue and product growth.", trait: "Leadership" },
      { id: 'd', text: "Audit the data infrastructure for security compliance and pipeline efficiency.", trait: "Technical" }
    ]
  },
  {
    id: 2,
    section: 'Aptitude',
    type: 'aptitude',
    question: "A project deadline is approaching, and a key technical bug arises. How do you solve it?",
    options: [
      { id: 'a', text: "Systematically isolate variables, inspect stack traces, and debug root causes logically.", trait: "Analytical" },
      { id: 'b', text: "Brainstorm creative workaround solutions or UX modifications to bypass the roadblock.", trait: "Creative" },
      { id: 'c', text: "Re-prioritize team tasks, manage stakeholder expectations, and assign resources.", trait: "Leadership" },
      { id: 'd', text: "Dive deep into core system code and optimize algorithms or refactor architecture.", trait: "Technical" }
    ]
  },
  {
    id: 3,
    section: 'Aptitude',
    type: 'aptitude',
    question: "Complete the numerical pattern logic: 3, 7, 16, 35, 74, [?]",
    options: [
      { id: 'a', text: "153 (Rule: Multiply by 2 and add 1, 2, 4, 8...)", trait: "Analytical" },
      { id: 'b', text: "148 (Rule: Double previous number)", trait: "Technical" },
      { id: 'c', text: "155 (Rule: Pattern estimation)", trait: "Creative" },
      { id: 'd', text: "160 (Rule: Approximated growth scale)", trait: "Leadership" }
    ]
  },
  {
    id: 4,
    section: 'Aptitude',
    type: 'aptitude',
    question: "Which type of problem-solving medium brings you the greatest sense of accomplishment?",
    options: [
      { id: 'a', text: "Solving complex mathematical, statistical, or logical puzzles.", trait: "Analytical" },
      { id: 'b', text: "Designing elegant UI, typography, user experiences, or visual art.", trait: "Creative" },
      { id: 'c', text: "Resolving inter-personal conflicts and inspiring people toward a common vision.", trait: "People" },
      { id: 'd', text: "Building robust software, engineering physical systems, or cloud networks.", trait: "Technical" }
    ]
  },
  {
    id: 5,
    section: 'Aptitude',
    type: 'aptitude',
    question: "If all Pointers are Data Types and some Data Types are Structures, which statement is definitively true?",
    options: [
      { id: 'a', text: "Some Pointers are Structures (Logical possibility requiring empirical proof).", trait: "Analytical" },
      { id: 'b', text: "All Structures are Pointers.", trait: "Technical" },
      { id: 'c', text: "Data Types connect Pointers and Structures logically.", trait: "Analytical" },
      { id: 'd', text: "No Pointers can ever be Structures.", trait: "Creative" }
    ]
  },
  {
    id: 6,
    section: 'Aptitude',
    type: 'aptitude',
    question: "How easily do you absorb and apply new abstract frameworks or algorithms?",
    options: [
      { id: 'a', text: "Extremely quickly; I break abstract models down into formulas and proofs.", trait: "Analytical" },
      { id: 'b', text: "Easily, provided I can visualize how it connects to user experiences.", trait: "Creative" },
      { id: 'c', text: "Fast, when I understand how it impacts organizational strategy.", trait: "Leadership" },
      { id: 'd', text: "Very quickly when I write code or build hands-on prototypes.", trait: "Technical" }
    ]
  },
  {
    id: 7,
    section: 'Aptitude',
    type: 'aptitude',
    question: "When reviewing a document or software demo, what catches your eye first?",
    options: [
      { id: 'a', text: "Flaws in calculations, data inconsistencies, or logical gaps.", trait: "Analytical" },
      { id: 'b', text: "Visual misalignment, poor contrast, or uninspiring layout aesthetics.", trait: "Creative" },
      { id: 'c', text: "Missing value propositions, unclear goals, or poor messaging.", trait: "Leadership" },
      { id: 'd', text: "Slow latency, unhandled edge cases, or broken interaction loops.", trait: "Technical" }
    ]
  },
  {
    id: 8,
    section: 'Aptitude',
    type: 'aptitude',
    question: "How do you approach learning a completely unfamiliar domain or industry?",
    options: [
      { id: 'a', text: "Read research papers, analyze data, and build quantitative mental models.", trait: "Analytical" },
      { id: 'b', text: "Explore moodboards, interview users, and sketch conceptual diagrams.", trait: "Creative" },
      { id: 'c', text: "Talk to industry experts, network with leaders, and master domain terminology.", trait: "People" },
      { id: 'd', text: "Build open-source prototypes and experiment directly with tools.", trait: "Technical" }
    ]
  },
  {
    id: 9,
    section: 'Aptitude',
    type: 'aptitude',
    question: "In a group project, what role do you naturally gravitate toward?",
    options: [
      { id: 'a', text: "The Analyst: Validating data, structuring metrics, and verifying calculations.", trait: "Analytical" },
      { id: 'b', text: "The Designer: Crafting slide decks, branding, and presentation storytelling.", trait: "Creative" },
      { id: 'c', text: "The Project Lead: Coordinating timelines, delegating, and pitching.", trait: "Leadership" },
      { id: 'd', text: "The Systems Architect: Writing core code, technical pipelines, or infrastructure.", trait: "Technical" }
    ]
  },
  {
    id: 10,
    section: 'Aptitude',
    type: 'aptitude',
    question: "When evaluating success on a project, which metric matters most to you?",
    options: [
      { id: 'a', text: "Statistical accuracy, measurable insights, and validated hypotheses.", trait: "Analytical" },
      { id: 'b', text: "User delight, aesthetic elegance, and emotional impact.", trait: "Creative" },
      { id: 'c', text: "Strategic market adoption, revenue growth, and team cohesion.", trait: "Leadership" },
      { id: 'd', text: "System stability, clean code quality, and zero crash rate.", trait: "Technical" }
    ]
  },

  // Section 2: Interests & Passion Domains (11-20)
  {
    id: 11,
    section: 'Interests',
    type: 'preference',
    question: "Which of the following topics could you read about or research for hours without getting tired?",
    options: [
      { id: 'a', text: "Machine learning algorithms, predictive analytics, and big data modeling.", trait: "Analytical" },
      { id: 'b', text: "UI/UX ergonomics, typography, digital animation, and design systems.", trait: "Creative" },
      { id: 'c', text: "Venture capital, startup growth strategies, and leadership psychology.", trait: "Leadership" },
      { id: 'd', text: "Distributed backend networks, cloud computing, and cybersecurity.", trait: "Technical" }
    ]
  },
  {
    id: 12,
    section: 'Interests',
    type: 'preference',
    question: "If given funding to start a passion project, what would you create?",
    options: [
      { id: 'a', text: "An AI analytics platform predicting financial markets or health trends.", trait: "Analytical" },
      { id: 'b', text: "A creative studio producing interactive digital products and immersive games.", trait: "Creative" },
      { id: 'c', text: "A social enterprise platform connecting mentors and aspiring entrepreneurs.", trait: "People" },
      { id: 'd', text: "A next-generation open-source developer framework or cloud platform.", trait: "Technical" }
    ]
  },
  {
    id: 13,
    section: 'Interests',
    type: 'preference',
    question: "Which environment energizes your creativity the most?",
    options: [
      { id: 'a', text: "A quiet research lab or dual-monitor setup focused on deep data analysis.", trait: "Analytical" },
      { id: 'b', text: "A vibrant design workshop filled with whiteboards, color swatches, and sketches.", trait: "Creative" },
      { id: 'c', text: "A fast-paced boardroom or executive office driving high-impact decisions.", trait: "Leadership" },
      { id: 'd', text: "A collaborative developer hub surrounded by high-performance hardware and code.", trait: "Technical" }
    ]
  },
  {
    id: 14,
    section: 'Interests',
    type: 'preference',
    question: "What type of online course or workshop would you enroll in voluntarily?",
    options: [
      { id: 'a', text: "Advanced Data Science, Python for Econometrics, or Neural Networks.", trait: "Analytical" },
      { id: 'b', text: "Product Design Mastery, Figma Animation, or Brand Strategy.", trait: "Creative" },
      { id: 'c', text: "Executive Negotiation, Product Management, or Public Speaking.", trait: "Leadership" },
      { id: 'd', text: "Full Stack Web Architecture, Rust Programming, or Cloud DevOps.", trait: "Technical" }
    ]
  },
  {
    id: 15,
    section: 'Interests',
    type: 'preference',
    question: "Which emerging industry trend excites you the most?",
    options: [
      { id: 'a', text: "Generative AI models analyzing genomic or economic data.", trait: "Analytical" },
      { id: 'b', text: "AR/VR spatial computing interfaces and micro-interactions.", trait: "Creative" },
      { id: 'c', text: "Ethical leadership and decentralized community governance.", trait: "People" },
      { id: 'd', text: "Quantum computing, autonomous robotics, and edge computing.", trait: "Technical" }
    ]
  },
  {
    id: 16,
    section: 'Interests',
    type: 'preference',
    question: "What kind of problem do you find most meaningful to solve?",
    options: [
      { id: 'a', text: "Uncovering hidden truths inside complex, noisy data.", trait: "Analytical" },
      { id: 'b', text: "Turning confusing, cluttered experiences into beautiful, intuitive ones.", trait: "Creative" },
      { id: 'c', text: "Helping organizations scale and empowering team members to succeed.", trait: "Leadership" },
      { id: 'd', text: "Building reliable infrastructure that millions of users rely on daily.", trait: "Technical" }
    ]
  },
  {
    id: 17,
    section: 'Interests',
    type: 'preference',
    question: "What kind of podcasts or YouTube channels do you enjoy watching?",
    options: [
      { id: 'a', text: "Deep dives into statistics, data engineering, or scientific research.", trait: "Analytical" },
      { id: 'b', text: "Design critiques, creative process breakdowns, or art history.", trait: "Creative" },
      { id: 'c', text: "Interviews with founders, CEOs, and organizational strategists.", trait: "Leadership" },
      { id: 'd', text: "Software engineering architecture, hardware teardowns, or coding tutorials.", trait: "Technical" }
    ]
  },
  {
    id: 18,
    section: 'Interests',
    type: 'preference',
    question: "Which reward feels most satisfying at the end of a project?",
    options: [
      { id: 'a', text: "Publishing a clear report proving a critical hypothesis with quantitative rigor.", trait: "Analytical" },
      { id: 'b', text: "Seeing users marvel at the polished design and smooth aesthetics.", trait: "Creative" },
      { id: 'c', text: "Receiving praise from leadership for exceeding strategic targets.", trait: "Leadership" },
      { id: 'd', text: "Deploying production-grade software that runs smoothly with 99.99% uptime.", trait: "Technical" }
    ]
  },
  {
    id: 19,
    section: 'Interests',
    type: 'preference',
    question: "When working on a product team, which phase of development do you enjoy most?",
    options: [
      { id: 'a', text: "Data exploration and user metric benchmarking.", trait: "Analytical" },
      { id: 'b', text: "Wireframing, prototyping, and visual design polish.", trait: "Creative" },
      { id: 'c', text: "Product roadmap planning and feature prioritization.", trait: "Leadership" },
      { id: 'd', text: "Coding frontend components, backend APIs, and database schemas.", trait: "Technical" }
    ]
  },
  {
    id: 20,
    section: 'Interests',
    type: 'preference',
    question: "How do you prefer to communicate your ideas to others?",
    options: [
      { id: 'a', text: "Through charts, mathematical models, and structured data tables.", trait: "Analytical" },
      { id: 'b', text: "Through interactive visual mocks, storyboards, and mood boards.", trait: "Creative" },
      { id: 'c', text: "Through compelling pitch decks, strategic narratives, and verbal presentations.", trait: "Leadership" },
      { id: 'd', text: "Through system architecture diagrams, API specs, and working code.", trait: "Technical" }
    ]
  },

  // Section 3: Work Preferences & Environment (21-30)
  {
    id: 21,
    section: 'Work Preferences',
    type: 'scenario',
    question: "What work pace and environment structure brings out your best performance?",
    options: [
      { id: 'a', text: "Structured, quiet, analytical environment with uninterrupted deep focus time.", trait: "Analytical" },
      { id: 'b', text: "Flexible, creative studio style with artistic freedom and dynamic iteration.", trait: "Creative" },
      { id: 'c', text: "High-stakes, fast-moving environment with frequent team interaction and decision-making.", trait: "Leadership" },
      { id: 'd', text: "Agile engineering squad with clear sprint goals and hands-on coding sessions.", trait: "Technical" }
    ]
  },
  {
    id: 22,
    section: 'Work Preferences',
    type: 'scenario',
    question: "How do you handle ambiguous, unstructured project assignments?",
    options: [
      { id: 'a', text: "I define quantitative scope boundaries and structure hypotheses immediately.", trait: "Analytical" },
      { id: 'b', text: "I view ambiguity as an exciting blank canvas for creative exploration.", trait: "Creative" },
      { id: 'c', text: "I gather stakeholders together, align expectations, and set a clear roadmap.", trait: "Leadership" },
      { id: 'd', text: "I build quick technical prototypes to discover constraints and capabilities.", trait: "Technical" }
    ]
  },
  {
    id: 23,
    section: 'Work Preferences',
    type: 'scenario',
    question: "Which aspect of team collaboration do you value most?",
    options: [
      { id: 'a', text: "Objective critique based on evidence and logical validity.", trait: "Analytical" },
      { id: 'b', text: "Open creative expression and mutual inspiration.", trait: "Creative" },
      { id: 'c', text: "Mutual accountability, high morale, and clear goal alignment.", trait: "Leadership" },
      { id: 'd', text: "Clear division of technical labor and high code quality standards.", trait: "Technical" }
    ]
  },
  {
    id: 24,
    section: 'Work Preferences',
    type: 'scenario',
    question: "How do you prefer to receive feedback on your performance?",
    options: [
      { id: 'a', text: "Specific data metrics, benchmarks, and quantitative performance indicators.", trait: "Analytical" },
      { id: 'b', text: "Qualitative critiques on design aesthetics, tone, and user resonance.", trait: "Creative" },
      { id: 'c', text: "360-degree feedback from peers and leaders on impact and communication.", trait: "People" },
      { id: 'd', text: "Code reviews, system efficiency benchmarks, and technical completeness.", trait: "Technical" }
    ]
  },
  {
    id: 25,
    section: 'Work Preferences',
    type: 'scenario',
    question: "When working in remote or hybrid arrangements, how do you manage your workday?",
    options: [
      { id: 'a', text: "Block deep-work time slots for uninterrupted analytical problem solving.", trait: "Analytical" },
      { id: 'b', text: "Alternate between deep creative focus and rapid visual inspiration breaks.", trait: "Creative" },
      { id: 'c', text: "Schedule syncs, check-ins, and alignment meetings with cross-functional partners.", trait: "Leadership" },
      { id: 'd', text: "Work in focused coding sprints while keeping asynchronous communication active.", trait: "Technical" }
    ]
  },
  {
    id: 26,
    section: 'Work Preferences',
    type: 'scenario',
    question: "What type of career growth path appeals to you most long-term?",
    options: [
      { id: 'a', text: "Subject Matter Expert / Principal Analyst uncovering key insights.", trait: "Analytical" },
      { id: 'b', text: "Design Director / Creative Lead shaping brand and product vision.", trait: "Creative" },
      { id: 'c', text: "Chief Executive Officer / VP of Operations driving company strategy.", trait: "Leadership" },
      { id: 'd', text: "Chief Technology Officer / Principal Systems Architect building platforms.", trait: "Technical" }
    ]
  },
  {
    id: 27,
    section: 'Work Preferences',
    type: 'scenario',
    question: "How do you respond when a project pivot requires discarding days of previous work?",
    options: [
      { id: 'a', text: "Analyze the data driving the pivot to ensure the new direction is mathematically sound.", trait: "Analytical" },
      { id: 'b', text: "Embrace the opportunity to craft a fresh, superior design solution.", trait: "Creative" },
      { id: 'c', text: "Rally team morale and re-align team goals around the updated business strategy.", trait: "Leadership" },
      { id: 'd', text: "Refactor technical assets efficiently and save reusable components.", trait: "Technical" }
    ]
  },
  {
    id: 28,
    section: 'Work Preferences',
    type: 'scenario',
    question: "What kind of work culture makes you feel most valued?",
    options: [
      { id: 'a', text: "A culture of intellectual rigor, transparency, and data-driven truth.", trait: "Analytical" },
      { id: 'b', text: "A culture of innovation, artistic freedom, and design excellence.", trait: "Creative" },
      { id: 'c', text: "A culture of empowerment, shared mission, and strong leadership.", trait: "Leadership" },
      { id: 'd', text: "A culture of engineering excellence, continuous learning, and craftsmanship.", trait: "Technical" }
    ]
  },
  {
    id: 29,
    section: 'Work Preferences',
    type: 'scenario',
    question: "Which tooling ecosystem feels most natural in your daily routine?",
    options: [
      { id: 'a', text: "Python, SQL, R, Tableau, Excel, Jupyter Notebooks.", trait: "Analytical" },
      { id: 'b', text: "Figma, Adobe Creative Suite, Framer, Principle, Webflow.", trait: "Creative" },
      { id: 'c', text: "Jira, Notion, Slack, PowerPoint, Salesforce, Miro.", trait: "Leadership" },
      { id: 'd', text: "VS Code, Git, Docker, Kubernetes, AWS, React, Node.js.", trait: "Technical" }
    ]
  },
  {
    id: 30,
    section: 'Work Preferences',
    type: 'scenario',
    question: "In your ideal job, what is your primary contribution to the team?",
    options: [
      { id: 'a', text: "Providing actionable, data-backed clarity in complex situations.", trait: "Analytical" },
      { id: 'b', text: "Crafting beautiful, human-centered experiences that delight people.", trait: "Creative" },
      { id: 'c', text: "Inspiring teams, setting strategy, and achieving ambitious goals.", trait: "Leadership" },
      { id: 'd', text: "Engineering robust, scalable, high-performance technology systems.", trait: "Technical" }
    ]
  }
];
