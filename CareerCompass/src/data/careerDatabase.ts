export interface CareerProfile {
  id: string;
  title: string;
  cluster: string;
  matchScore: number;
  salaryRange: {
    entry: string;
    mid: string;
    senior: string;
  };
  summary: string;
  description: string;
  workEnvironment: string;
  whyMatch: string[];
  requiredSkills: string[];
  recommendedSubjects: string[];
  academicTracks: {
    degree: string;
    focus: string;
  }[];
  skillDevelopment: {
    category: string;
    items: string[];
  }[];
  radarScores: {
    subject: string;
    score: number; // 0-100
  }[];
}

export const CAREER_DATABASE: CareerProfile[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst & Business Intelligence Lead',
    cluster: 'Data & Analytics',
    matchScore: 87,
    salaryRange: {
      entry: '$65,000 - $82,000',
      mid: '$85,000 - $115,000',
      senior: '$120,000 - $165,000'
    },
    summary: 'Transforms raw data into actionable strategic insights using statistical models, SQL, and interactive dashboards.',
    description: 'Data Analysts bridge the gap between technical data engineering and executive business decision-making. You will inspect customer behavioral metrics, run regression analyses, build real-time visual dashboards, and present quantitative recommendations to cross-functional stakeholders.',
    workEnvironment: 'Hybrid / Collaborative product teams with dual-monitor focus time for deep statistical modeling.',
    whyMatch: [
      'High Analytical Aptitude (Top 10% score in quantitative logic)',
      'Strong Wanted Control preference (Thrives with structured goals & explicit criteria)',
      'High affinity for statistical modeling and data visualization tools'
    ],
    requiredSkills: [
      'SQL & Database Querying',
      'Python (Pandas, NumPy, Scikit-Learn)',
      'Tableau / Power BI / Looker',
      'Statistical Analysis & A/B Testing',
      'Data Storytelling & Stakeholder Reporting'
    ],
    recommendedSubjects: [
      'Applied Mathematics & Statistics',
      'Computer Science / Information Systems',
      'Economics & Econometrics',
      'Business Analytics'
    ],
    academicTracks: [
      { degree: "B.S. in Data Science / Computer Science", focus: "Database Systems & Machine Learning Foundations" },
      { degree: "B.S. in Economics / Statistics", focus: "Econometrics & Quantitative Research Methods" },
      { degree: "M.S. in Business Analytics", focus: "Applied Enterprise Analytics & Executive Strategy" }
    ],
    skillDevelopment: [
      {
        category: "Immediate (0-6 Months)",
        items: ["Master SQL JOINs, CTEs & Aggregations", "Learn Python Data Wrangling (Pandas/NumPy)", "Build 2 Tableau or PowerBI dashboards"]
      },
      {
        category: "Medium-Term (6-18 Months)",
        items: ["Learn A/B Testing & Hypothesis Testing", "Integrate BigQuery / Snowflake data warehouses", "Conduct real-world Exploratory Data Analysis (EDA) projects"]
      },
      {
        category: "Advanced (18+ Months)",
        items: ["Predictive Machine Learning modeling", "Automate ELT data pipelines with dbt", "Lead cross-functional BI data strategy"]
      }
    ],
    radarScores: [
      { subject: 'Analytical Logic', score: 92 },
      { subject: 'Technical Capability', score: 84 },
      { subject: 'Creative Thinking', score: 65 },
      { subject: 'Leadership & Strategy', score: 70 },
      { subject: 'Interpersonal Warmth', score: 78 }
    ]
  },
  {
    id: 'fullstack-engineer',
    title: 'Full-Stack Software Engineer',
    cluster: 'Technology & Software',
    matchScore: 81,
    salaryRange: {
      entry: '$75,000 - $98,000',
      mid: '$110,000 - $145,000',
      senior: '$150,000 - $210,000+'
    },
    summary: 'Architects and constructs responsive modern web applications, scalable APIs, and backend cloud microservices.',
    description: 'Full-Stack Engineers build end-to-end digital web applications. From crafting accessible UI components with React/TypeScript to building resilient REST/GraphQL APIs and managing database schemas, full-stack engineers turn product visions into high-performance software.',
    workEnvironment: 'Agile engineering squads, remote-first or hybrid tech hubs with git code reviews.',
    whyMatch: [
      'Exceptional Technical Aptitude & hands-on code affinity',
      'High Expressed Control & problem solving autonomy',
      'Strong inclination toward systemic design and software craftsmanship'
    ],
    requiredSkills: [
      'TypeScript & React / Next.js',
      'Node.js / Python / Go APIs',
      'PostgreSQL & MongoDB Database Design',
      'Git Version Control & CI/CD Pipelines',
      'Cloud Services (AWS / GCP / Vercel)'
    ],
    recommendedSubjects: [
      'Computer Science & Software Engineering',
      'Data Structures & Algorithms',
      'Web Architecture & Distributed Systems',
      'Human-Computer Interaction'
    ],
    academicTracks: [
      { degree: "B.S. in Computer Science", focus: "Algorithms, Operating Systems & Full-Stack Development" },
      { degree: "B.S. in Software Engineering", focus: "System Architecture, DevOps & Testing Frameworks" }
    ],
    skillDevelopment: [
      {
        category: "Immediate (0-6 Months)",
        items: ["Build 3 full-stack React + Node/Express apps", "Master TypeScript types & async programming", "Learn SQL database relational modeling"]
      },
      {
        category: "Medium-Term (6-18 Months)",
        items: ["Deploy apps on Cloud platforms (AWS/Vercel)", "Master Docker containerization & CI/CD workflows", "Implement authentication & authorization protocols"]
      },
      {
        category: "Advanced (18+ Months)",
        items: ["Architect microservices & event-driven systems", "Optimize database query performance & caching", "Mentor junior software developers"]
      }
    ],
    radarScores: [
      { subject: 'Analytical Logic', score: 88 },
      { subject: 'Technical Capability', score: 96 },
      { subject: 'Creative Thinking', score: 72 },
      { subject: 'Leadership & Strategy', score: 68 },
      { subject: 'Interpersonal Warmth', score: 65 }
    ]
  },
  {
    id: 'ux-ui-designer',
    title: 'Product Designer (UI/UX)',
    cluster: 'Design & Creative',
    matchScore: 78,
    salaryRange: {
      entry: '$62,000 - $78,000',
      mid: '$85,000 - $118,000',
      senior: '$125,000 - $175,000'
    },
    summary: 'Crafts intuitive, visually stunning digital experiences through human-centered user research, wireframing, and interactive design.',
    description: 'Product Designers are advocates for the user experience. You will conduct user interviews, design design systems in Figma, build interactive prototypes, and collaborate with engineers to ensure seamless visual execution.',
    workEnvironment: 'Creative design studio or product pods alongside product managers and frontend engineers.',
    whyMatch: [
      'High Creative Thinking & aesthetic spatial vision',
      'Strong Wanted & Expressed Affection (Empathy for end-users)',
      'Passion for visual elegance, typography, and human-computer interaction'
    ],
    requiredSkills: [
      'Figma & Interactive Prototyping',
      'User Research & Usability Testing',
      'Design Systems & UI Pattern Libraries',
      'Information Architecture & Wireframing',
      'Frontend Basics (HTML/CSS & Micro-animations)'
    ],
    recommendedSubjects: [
      'Human-Computer Interaction (HCI)',
      'Graphic Design & Digital Media',
      'Cognitive Psychology',
      'Product Design'
    ],
    academicTracks: [
      { degree: "B.F.A. / B.S. in Interaction Design or HCI", focus: "User-Centered Design & Digital Prototyping" },
      { degree: "B.A. in Visual Communication / Psychology", focus: "Cognitive Ergonomics & Visual Storytelling" }
    ],
    skillDevelopment: [
      {
        category: "Immediate (0-6 Months)",
        items: ["Master Figma auto-layout, components & variants", "Create 2 end-to-end UX case studies", "Conduct 5 user usability testing interviews"]
      },
      {
        category: "Medium-Term (6-18 Months)",
        items: ["Build scalable design systems", "Learn micro-interaction animations (Framer/Lottie)", "Study web accessibility WCAG standards"]
      },
      {
        category: "Advanced (18+ Months)",
        items: ["Lead design strategy & product vision", "Collaborate directly with executive stakeholders", "Mentor junior UI/UX designers"]
      }
    ],
    radarScores: [
      { subject: 'Analytical Logic', score: 70 },
      { subject: 'Technical Capability', score: 65 },
      { subject: 'Creative Thinking', score: 95 },
      { subject: 'Leadership & Strategy', score: 74 },
      { subject: 'Interpersonal Warmth', score: 88 }
    ]
  },
  {
    id: 'product-manager',
    title: 'Technical Product Manager',
    cluster: 'Management & Strategy',
    matchScore: 74,
    salaryRange: {
      entry: '$80,000 - $105,000',
      mid: '$115,000 - $155,000',
      senior: '$160,000 - $230,000+'
    },
    summary: 'Defines product vision, prioritizes roadmaps, and aligns engineering, design, and marketing to build successful digital products.',
    description: 'Product Managers operate at the intersection of business, technology, and user experience. You will translate user feedback and market opportunities into feature specs, lead sprint planning, and drive key performance metrics.',
    workEnvironment: 'Dynamic corporate tech offices, frequent cross-functional syncs with developers and leadership.',
    whyMatch: [
      'High Expressed Control & Leadership orientation',
      'Balanced profile across analytical logic and team collaboration',
      'Strong strategic communication and goal orientation'
    ],
    requiredSkills: [
      'Product Strategy & Roadmap Planning',
      'Agile / Scrum Methodologies',
      'User Metrics & Data Analytics (Amplitude/Mixpanel)',
      'Feature Prioritization Frameworks (RICE/Kano)',
      'Technical Communication & API Literacy'
    ],
    recommendedSubjects: [
      'Business Administration & Management',
      'Computer Science / Engineering',
      'Product Management',
      'Marketing & Consumer Behavior'
    ],
    academicTracks: [
      { degree: "B.S. in Computer Science + MBA", focus: "Tech Architecture & Business Strategy" },
      { degree: "B.S. in Management & Technology", focus: "Agile Leadership & Innovation Management" }
    ],
    skillDevelopment: [
      {
        category: "Immediate (0-6 Months)",
        items: ["Learn Agile/Scrum user story writing", "Understand tech product metrics (CAC, LTV, Retention)", "Conduct competitive market analysis"]
      },
      {
        category: "Medium-Term (6-18 Months)",
        items: ["Manage a live product feature launch", "Facilitate cross-functional sprint planning", "Run user discovery interviews and prioritization"]
      },
      {
        category: "Advanced (18+ Months)",
        items: ["Define multi-year company product vision", "Manage product P&L and growth strategy", "Lead a team of product managers"]
      }
    ],
    radarScores: [
      { subject: 'Analytical Logic', score: 82 },
      { subject: 'Technical Capability', score: 75 },
      { subject: 'Creative Thinking', score: 78 },
      { subject: 'Leadership & Strategy', score: 94 },
      { subject: 'Interpersonal Warmth', score: 85 }
    ]
  },
  {
    id: 'ai-researcher',
    title: 'AI & Machine Learning Scientist',
    cluster: 'Artificial Intelligence & ML',
    matchScore: 71,
    salaryRange: {
      entry: '$90,000 - $120,000',
      mid: '$130,000 - $185,000',
      senior: '$190,000 - $300,000+'
    },
    summary: 'Researches, designs, and trains cutting-edge neural networks, generative AI models, and computer vision systems.',
    description: 'AI & ML Scientists create state-of-the-art computational intelligence systems. You will formulate machine learning algorithms, train deep neural networks (LLMs, Transformers), publish research papers, and deploy high-performance AI inference models.',
    workEnvironment: 'High-tech AI labs, cloud compute GPU clusters, and research institutions.',
    whyMatch: [
      'Top-tier Analytical & Mathematical logic score',
      'High passion for deep technical innovation and research',
      'Prefers autonomous deep-focus environment'
    ],
    requiredSkills: [
      'Python & PyTorch / TensorFlow',
      'Deep Learning & Neural Networks (Transformers, LLMs)',
      'Linear Algebra, Calculus & Probability',
      'Model Optimization & GPU Acceleration (CUDA)',
      'Research Paper Implementation & MLOps'
    ],
    recommendedSubjects: [
      'Computer Science / AI Specialization',
      'Applied Mathematics / Mathematical Physics',
      'Computational Neuroscience',
      'Statistics & Machine Learning'
    ],
    academicTracks: [
      { degree: "B.S. + Ph.D. in Computer Science / Machine Learning", focus: "Deep Learning, NLP & Computer Vision" },
      { degree: "M.S. in Artificial Intelligence", focus: "Reinforcement Learning & Neural Architecture" }
    ],
    skillDevelopment: [
      {
        category: "Immediate (0-6 Months)",
        items: ["Master PyTorch tensor operations & neural networks", "Implement classical ML algorithms from scratch", "Study Transformer model architectures"]
      },
      {
        category: "Medium-Term (6-18 Months)",
        items: ["Fine-tune open-source LLMs (Llama/Mistral)", "Build automated MLOps evaluation pipelines", "Publish research projects or GitHub repositories"]
      },
      {
        category: "Advanced (18+ Months)",
        items: ["Architect novel neural model architectures", "Optimize large-scale distributed GPU training", "Lead AI research initiatives"]
      }
    ],
    radarScores: [
      { subject: 'Analytical Logic', score: 98 },
      { subject: 'Technical Capability', score: 92 },
      { subject: 'Creative Thinking', score: 80 },
      { subject: 'Leadership & Strategy', score: 60 },
      { subject: 'Interpersonal Warmth', score: 55 }
    ]
  }
];

export const CAREER_CLUSTERS = [
  {
    name: 'Data & Analytics',
    matchPercentage: 87,
    iconName: 'BarChart3',
    description: 'Uncovering statistical insights, predictive modeling, and business intelligence strategy.',
    topCareers: ['Data Analyst & BI Lead', 'Data Engineer', 'Quantitative Analyst']
  },
  {
    name: 'Technology & Software',
    matchPercentage: 81,
    iconName: 'Code2',
    description: 'Engineering responsive modern web apps, distributed systems, and cloud backend microservices.',
    topCareers: ['Full-Stack Software Engineer', 'DevOps & Cloud Architect', 'Backend Engineer']
  },
  {
    name: 'Design & Creative',
    matchPercentage: 78,
    iconName: 'Palette',
    description: 'Human-centered UI/UX design, visual design systems, and digital product experience.',
    topCareers: ['Product Designer (UI/UX)', 'Design Systems Engineer', 'UX Researcher']
  },
  {
    name: 'Management & Strategy',
    matchPercentage: 74,
    iconName: 'Briefcase',
    description: 'Product management, agile team leadership, and strategic market expansion.',
    topCareers: ['Technical Product Manager', 'Management Consultant', 'Operations Strategist']
  },
  {
    name: 'Artificial Intelligence & ML',
    matchPercentage: 71,
    iconName: 'BrainCircuit',
    description: 'Deep neural network research, LLM fine-tuning, computer vision, and machine learning pipelines.',
    topCareers: ['AI Research Scientist', 'Machine Learning Engineer', 'NLP Specialist']
  }
];
