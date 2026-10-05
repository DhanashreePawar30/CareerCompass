# 🧭 CareerCompass: Master Project Overview, Diagnostic Testing & LLM Architecture Guide

> **Deep Multi-Vector Career Alignment Platform**  
> *Transforming psychological vectors, cognitive aptitude, and academic telemetry into explainable, personalized 5-year career trajectories.*

---

## 📑 Table of Contents

1. [Executive Summary & Project Overview](#1-executive-summary--project-overview)
2. [Core Architecture & Technical Stack](#2-core-architecture--technical-stack)
3. [User Journey & Feature Matrix](#3-user-journey--feature-matrix)
4. [Diagnostic Assessments & Test Battery](#4-diagnostic-assessments--test-battery)
   - 4.1 [FIRO-B Interpersonal Assessment (54 Questions)](#41-firo-b-interpersonal-assessment-54-questions)
   - 4.2 [Cognitive & Scenario Aptitude Test (30 Questions)](#42-cognitive--scenario-aptitude-test-30-questions)
   - 4.3 [Academic & Skill Delta Matrix](#43-academic--skill-delta-matrix)
   - 4.4 [Archetype Resolution & Matching Formula](#44-archetype-resolution--matching-formula)
5. [Quality Assurance & System Validation Tests](#5-quality-assurance--system-validation-tests)
   - 5.1 [Unit & Mathematical Algorithmic Testing](#51-unit--mathematical-algorithmic-testing)
   - 5.2 [State Persistence & Zero-Friction Session Testing](#52-state-persistence--zero-friction-session-testing)
   - 5.3 [End-to-End (E2E) Flow & UI Performance Validation](#53-end-to-end-e2e-flow--ui-performance-validation)
6. [LLM Model Implementation & Engineering Blueprint](#6-llm-model-implementation--engineering-blueprint)
   - 6.1 [Role of LLMs in CareerCompass](#61-role-of-llms-in-careercompass)
   - 6.2 [Tiered LLM Model Selection Strategy](#62-tiered-llm-model-selection-strategy)
   - 6.3 [Context Injection & System Prompt Architecture](#63-context-injection--system-prompt-architecture)
   - 6.4 [Structured JSON Output & Schema Enforcement](#64-structured-json-output--schema-enforcement)
   - 6.5 [RAG Pipeline: Grounding in Labor Market Data](#65-rag-pipeline-grounding-in-labor-market-data)
   - 6.6 [LLM Evaluation, Safety, and Guardrails](#66-llm-evaluation-safety-and-guardrails)
   - 6.7 [Step-by-Step Backend Integration Code Sample](#67-step-by-step-backend-integration-code-sample)
7. [Future Enhancements & Scalability Roadmap](#7-future-enhancements--scalability-roadmap)

---

## 1. Executive Summary & Project Overview

### 1.1 The Core Problem
Conventional career counseling and educational guidance tools suffer from fundamental structural flaws:
- **Over-reliance on static test marks & entrance ranks:** Ignoring intrinsic psychological traits, cognitive strengths, and workplace behavioral tendencies.
- **Generic, one-size-fits-all questionnaires:** Producing surface-level advice with no actionable roadmap.
- **Black-box recommendations:** Lacking explainability and transparency into *why* a particular role fits a student's unique personality and cognitive profile.

### 1.2 The CareerCompass Solution
**CareerCompass** is an AI-powered diagnostic and trajectory navigation platform. It synthesizes:
1. **Psychometric Behavioral Dynamics:** Quantified using the validated **FIRO-B (Fundamental Interpersonal Relations Orientation - Behavior)** model across 6 dimensions.
2. **Cognitive & Scenario Aptitude:** 5 core trait vectors (Analytical, Technical, Creative, Leadership, and People dynamics).
3. **Academic & Real Skill Baseline:** Current education tier, course stream, and verified skill tags.
4. **Explainable AI Matching:** Transparent mathematical matching percentages with clear justification tags.
5. **Generative 5-Year Action Blueprints:** Step-by-step milestones, foundational-to-advanced skill trees, and curated coursework.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CAREERCOMPASS ENGINE                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│   Psychometrics   │       │ Cognitive Aptitude│       │ Academic & Skills │
│  FIRO-B (54 Qs)   │       │  Custom (30 Qs)   │       │   Delta Matrix    │
│ (Inclusion/Control│       │ (Logic/Scenarios/ │       │ (Stream/Subjects/ │
│    /Affection)    │       │     Domain)       │       │    Skill Tags)    │
└─────────┬─────────┘       └─────────┬─────────┘       └─────────┬─────────┘
          │                           │                           │
          └───────────────────────────┼───────────────────────────┘
                                      │
                                      ▼
             ┌─────────────────────────────────────────────────┐
             │       Multi-Vector Scoring & AI Synthesis       │
             └────────────────────────┬────────────────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       ▼                                                             ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  Career Archetype Persona    │              │  Ranked Career Match Engine  │
│ • Systems Architect          │              │ • 96% Match with Explainable │
│ • Innovation Catalyst        │              │   AI Reasoning Tags          │
│ • Data Pioneer               │              │ • Side-by-Side Comparison    │
│ • Experience Technologist    │              │ • 5-Year Action Blueprint    │
└──────────────────────────────┘              └──────────────────────────────┘
```

---

## 2. Core Architecture & Technical Stack

### 2.1 Technology Stack

| Layer | Technologies Used | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite | Blazing-fast HMR, strict type safety, modular component architecture. |
| **Styling & Design System** | Tailwind CSS, Custom Modern CSS | Sleek typography (Outfit, Inter), glassmorphic surfaces, dark-mode styling, responsive layout. |
| **Motion & Physics** | GSAP (ScrollTrigger), Lenis Smooth Scroll | Luxury editorial feel, inertial mouse glows (`CursorGlow`), magnetic hover physics (`MagneticButton`). |
| **Data Visualization** | Recharts, Lucide Icons | Trait radars, comparative dimension bar charts, and milestone visualizers. |
| **State & Persistence** | React Context API, Browser `localStorage` | Real-time score aggregation, zero-friction guest sessions, zero-latency state restoration. |
| **Database (Target)** | MySQL 8.0+, Prisma ORM | Relational integrity for user profiles, psychometric responses, career catalog, and milestone tracking. |
| **AI / LLM Layer** | Gemini / OpenAI / Anthropic APIs, LangChain / LlamaIndex | Neural persona synthesis, generative roadmap generation, resume skill extraction, interactive AI counseling. |

### 2.2 Directory Architecture

```
CareerCompass/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Brand graphics and badges
│   ├── components/             # Reusable UI & Motion components
│   │   ├── ArchetypeCard.tsx   # Shareable persona card
│   │   ├── ComparisonDrawer.tsx# Side-by-side career comparison modal
│   │   ├── CursorGlow.tsx      # Ambient inertial cursor aura
│   │   ├── MagneticButton.tsx  # Interactive magnetic spring physics
│   │   ├── Navbar.tsx          # Navigation header with session progress
│   │   └── Footer.tsx          # Editorial footer
│   ├── context/
│   │   └── AssessmentContext.tsx# Central state: answers, scores, algorithms
│   ├── data/
│   │   ├── archetypes.ts       # 4 Core Persona definitions & classifier
│   │   ├── careerDatabase.ts   # Catalog of 12+ verified careers across 4 clusters
│   │   ├── customQuestions.ts  # 30 Cognitive & scenario questions
│   │   └── firoBQuestions.ts   # 54 Standardized FIRO-B questions
│   ├── pages/
│   │   ├── LandingPage.tsx     # Hero, Live Simulator widget, Value props
│   │   ├── AssessmentHub.tsx   # Dual test launcher and progress tracker
│   │   ├── FiroBTest.tsx       # 54-item psychometric assessment flow
│   │   ├── CustomTest.tsx      # 30-item cognitive & scenario flow
│   │   ├── AssessmentComplete.tsx # Live AI synthesis simulation & confetti
│   │   ├── ProfileSetup.tsx    # Academic stream & skill tagging engine
│   │   ├── Dashboard.tsx       # Trait radar, analytics, top recommended roles
│   │   ├── Explorer.tsx        # Searchable career cluster directory
│   │   └── CareerDetail.tsx    # 5-Year deep-dive roadmap & skill breakdown
│   ├── App.tsx                 # Routing & Layout wrapping
│   ├── main.tsx                # React root mount
│   └── index.css               # Design tokens, keyframes, scrollbar styling
├── CAREERCOMPASS_DATABASE_SCHEMA.md # MySQL 8.0+ production DDL & Prisma schema
├── CAREERCOMPASS_FEATURES.md        # Comprehensive feature specifications
└── package.json
```

---

## 3. User Journey & Feature Matrix

The user journey is structured into 9 cohesive phases:

```
[Phase 1: Landing Page] ──> Instant Simulator & Zero-Friction Hook
        │
[Phase 2: Assessment Hub] ──> Dual Test Launcher
        │
        ├──> [Module 1: 54 FIRO-B Questions] (Interpersonal Dynamics)
        └──> [Module 2: 30 Cognitive Questions] (Logic & Scenarios)
        │
[Phase 3: AI Neural Synthesis] ──> Live 4-Step Pipeline Simulation + Confetti
        │
[Phase 4: Archetype Reveal] ──> Persona Badge & Superpowers
        │
[Phase 5: Profile & Skills] ──> Academic Background + Skill Tag Synergy
        │
[Phase 6: Holistic Dashboard] ──> Trait Radar + FIRO-B Bars + Top #1 Match
        │
[Phase 7: Career Explorer] ──> Cluster Search & Explainable Match AI
        │
[Phase 8: Multi-Role Comparison] ──> Side-by-Side Drawer (Salary, Fit, Skills)
        │
[Phase 9: 5-Year Blueprint] ──> Step-by-Step Learning Milestones & Degree Paths
```

---

## 4. Diagnostic Assessments & Test Battery

CareerCompass administers a battery of **84 diagnostic questions** split into two scientifically grounded modules:

### 4.1 FIRO-B Interpersonal Assessment (54 Questions)
The FIRO-B instrument assesses how interpersonal needs shape a person's team role, leadership style, and workplace comfort.

#### 6 Fundamental Vectors Measured:
1. **Expressed Inclusion (EI) [9 items]:** How much the user actively reaches out to include others, join social networks, and participate in group settings.
2. **Wanted Inclusion (WI) [9 items]:** How much the user desires to be invited, acknowledged, and brought into team endeavors.
3. **Expressed Control (EC) [9 items]:** The tendency to take charge, direct workflows, assume responsibility, and make executive choices.
4. **Wanted Control (WC) [9 items]:** Preference for working in structured frameworks with clear hierarchy, defined guidelines, and established protocols.
5. **Expressed Affection (EA) [9 items]:** Warmth, vulnerability, and personal rapport extended to colleagues.
6. **Wanted Affection (WA) [9 items]:** The need for encouragement, psychological safety, and supportive personal relationships at work.

#### Scoring Mechanics:
- 6-Point Likert Scale (Values $1$ to $6$).
- Each category score ranges from $9$ to $54$ points.
- Vectors are stored in `firoBScores = { EI, WI, EC, WC, EA, WA }`.

---

### 4.2 Cognitive & Scenario Aptitude Test (30 Questions)
Assesses cognitive problem-solving modalities and preferred operational environments across 5 traits:

1. **Analytical:** Logical deduction, mathematical patterns, statistical inferences, algorithmic problem decomposition.
2. **Technical:** Hardware/software curiosity, system optimization, code abstractions, infrastructure stability.
3. **Creative:** Aesthetic intuition, interaction design, human-centered empathy, novel synthesis.
4. **Leadership:** Strategic prioritization, risk management, conflict resolution, vision communication.
5. **People:** Cross-functional consensus building, mentorship, client engagement, team cohesion.

#### Scoring Mechanics:
- Multiple-choice scenario questions (Options $a, b, c, d$).
- Each selected option maps to a specific trait indicator.
- Vectors are stored in `customTraitScores = { Analytical, Creative, Leadership, Technical, People }`.

---

### 4.3 Academic & Skill Delta Matrix
- **Academic Baseline:** Education Level, Course Stream/Major, Key Subjects, and Grade/CGPA.
- **Skill Synergy Tagging:** User tags existing skills (e.g., *Python, React, SQL, Financial Modeling, UI/UX*).
- **Skill Boost:** Every matching skill between the user's profile and a career's `requiredSkills` dynamically increments the career match score by $+2\%$.

---

### 4.4 Archetype Resolution & Matching Formula

#### 1. Archetype Assignment Logic:
```typescript
if (traits.Analytical >= traits.Creative && traits.Analytical >= traits.People) {
  if (firoB.EC >= 35) {
    return ARCHETYPES['strategic-architect'];    // High Analytical + Deliberate Control
  }
  return ARCHETYPES['data-strategist'];          // High Analytical + Empirical Precision
} else if (traits.Creative > traits.Analytical && traits.Creative >= traits.Leadership) {
  return ARCHETYPES['creative-builder'];          // High Creative + Frontend Craft
} else {
  return ARCHETYPES['collaborative-catalyst'];    // High Affection + Agile Leadership
}
```

#### 2. Dynamic Career Match Formula:
$$\text{MatchScore} = \text{Base} + (\text{PrimaryTrait} \times w_1) + (\text{SecondaryTrait} \times w_2) + \text{FiroBBonus} + (\text{MatchedSkills} \times 2)$$

Where:
- $\text{Base} = 70\%$
- Weight parameters $w_1 = 2.5 \text{ to } 3.0$, $w_2 = 1.0 \text{ to } 1.5$
- $\text{FiroBBonus} = +3 \text{ to } +5\%$ based on interpersonal role synergy
- Score is clamped between $65\%$ and $99\%$.

---

## 5. Quality Assurance & System Validation Tests

To ensure scientific validity, mathematical accuracy, and bulletproof user experience, the system undergoes rigorous automated and manual test suites:

### 5.1 Unit & Mathematical Algorithmic Testing

| Test Case ID | Test Target | Verification Criteria | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **UT-01** | FIRO-B Score Aggregation | Sum 9 questions per category with values $1 \dots 6$. | Score between $9$ and $54$ for each vector (EI, WI, EC, WC, EA, WA). |
| **UT-02** | Trait Score Aggregation | Sum chosen option traits from 30 cognitive questions. | Sum of all trait counts equals $30$. |
| **UT-03** | Archetype Classifier | Feed boundary conditions (e.g. Analytical $= 15$, EC $= 40$). | Exact deterministic resolution to `strategic-architect`. |
| **UT-04** | Match Score Boundary Clamping | Extreme trait combinations (all maximum or all minimum). | Computed match score must strictly satisfy $65 \le \text{Score} \le 99$. |
| **UT-05** | Skill Boost Multiplier | Adding 3 relevant skills to academic profile. | Career match score increases by exactly $+6\%$, capped at $99\%$. |

---

### 5.2 State Persistence & Zero-Friction Session Testing

| Test Case ID | Test Target | Verification Criteria | Expected Outcome |
| :--- | :--- | :--- | :--- |
| **ST-01** | Mid-Assessment Tab Refresh | Complete 25/54 FIRO-B questions and refresh browser. | State is preserved from `localStorage`, resuming at Q26 without data loss. |
| **ST-02** | Cross-Module Transitions | Complete FIRO-B, verify status flag `cc_firob_complete`. | Hub updates to show 54/54 complete, unlocking Module 2. |
| **ST-03** | Demo User Injection | Trigger `loadDemoUser()` action. | Populates verified answers, unlocks all pages, redirects seamlessly. |
| **ST-04** | Reset Functionality | Trigger `resetAssessment()` action. | Purges `localStorage`, clears all scores, and resets HUD counters to 0. |

---

### 5.3 End-to-End (E2E) Flow & UI Performance Validation

| Test Case ID | Test Scope | Verification Steps | Success Criteria |
| :--- | :--- | :--- | :--- |
| **E2E-01** | Full Guest-to-Result Flow | Landing Page $\to$ FIRO-B $\to$ Custom Test $\to$ AI Synthesis $\to$ Profile $\to$ Dashboard. | Zero runtime errors; Confetti triggers at 100% synthesis; Radar renders. |
| **E2E-02** | Career Comparison Drawer | Select 2 or 3 careers in Explorer and open comparison. | Side-by-side metrics (Salaries, Skills, Fit) align accurately. |
| **E2E-03** | 5-Year Blueprint Navigation | Click on any career card (e.g. `/explorer/ai-ml-engineer`). | Renders full role overview, prerequisite skill tree, and year-by-year roadmap. |
| **PERF-01**| Lenis & GSAP Animation FPS | Smooth scroll across Landing Page & Dashboard. | Sustains consistent 60 FPS without jank or layout thrashing. |

---

## 6. LLM Model Implementation & Engineering Blueprint

This section provides the end-to-end technical specification for integrating Large Language Models (LLMs) into CareerCompass.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       LLM SYSTEM ARCHITECTURE                           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌───────────────────────────┐           ┌───────────────────────────┐
    │     User Profile &        │           │    Domain Knowledge &     │
    │  Psychometric Telemetry   │           │    Labor Market Corpus    │
    │ • FIRO-B Scores (EI/EC/EA)│           │ • O*NET Taxonomy & Skills │
    │ • Cognitive Trait Vectors │           │ • Curated Degree Syllabi  │
    │ • Academic Major & Skills │           │ • Real-time Salary Trends │
    └─────────────┬─────────────┘           └─────────────┬─────────────┘
                  │                                       │
                  │        ┌──────────────────────────────┘
                  ▼        ▼
    ┌───────────────────────────────────────────┐
    │     Prompt Orchestration & RAG Context    │
    │  • System Identity & Guardrails           │
    │  • Structured Few-Shot Exemplars          │
    │  • Dynamic Vector Retrieval Injection     │
    └─────────────────────┬─────────────────────┘
                          │
                          ▼
    ┌───────────────────────────────────────────┐
    │          Tiered Model Execution           │
    │  • Fast Tier: Gemini 1.5 Flash / GPT-4o-M │
    │  • Deep Tier: Gemini 1.5 Pro / GPT-4o     │
    │  • Strict JSON Schema Validation          │
    └─────────────────────┬─────────────────────┘
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
┌───────────────────────────┐    ┌───────────────────────────┐
│  Generative Dynamic Plan  │    │  Conversational AI Mentor │
│ • Tailored 5-Yr Milestones│    │ • Explainable Match Q&A   │
│ • Custom Skill Gap Plan   │    │ • Mock Behavioral Interview│
└───────────────────────────┘    └───────────────────────────┘
```

---

### 6.1 Role of LLMs in CareerCompass

LLMs are utilized across four strategic capabilities:
1. **Dynamic 5-Year Career Trajectory Generator:** Synthesizing the student's unique academic baseline, missing skills, and psychometric archetype into an individualized learning blueprint.
2. **Explainable AI Justification Generator:** Producing natural-language rationales for why a student is suited for a specific role based on their FIRO-B interpersonal matrix and cognitive traits.
3. **Resume Skill Parser & Gap Extractor:** Parsing uploaded CVs/resumes (PDF/Text) to extract verified skills and output an exact skill-gap percentage against target roles.
4. **Context-Aware AI Career Mentor & Mock Interviewer:** An interactive chat agent aware of the student's FIRO-B profile that conducts behavioral and technical mock interviews tailored to their archetype.

---

### 6.2 Tiered LLM Model Selection Strategy

To balance low latency, cost efficiency, and deep analytical reasoning, CareerCompass uses a **two-tiered model architecture**:

| Tier | Recommended Models | Primary Tasks | Target Latency | Cost Profile |
| :--- | :--- | :--- | :--- | :--- |
| **Fast / Real-time Tier** | **Gemini 1.5 Flash** / **GPT-4o-mini** / **Claude 3.5 Haiku** | • Interactive Chat Mentor<br>• Resume Skill Tagging<br>• Live Explainability Snippets | $< 800\text{ ms}$ | Low ($\approx \$0.075 / 1\text{M tokens}$) |
| **Deep Reasoning Tier** | **Gemini 1.5 Pro** / **GPT-4o** / **Claude 3.5 Sonnet** | • Multi-Vector Psychometric Synthesis<br>• Custom 5-Year Blueprint Generation<br>• Complex Skill Delta Analysis | $2.0 - 4.5\text{ s}$ | Moderate ($\approx \$2.50 / 1\text{M tokens}$) |
| **Self-Hosted (Enterprise)** | **Llama 3.3 70B Instruct** / **Mistral NeMo 12B** | • On-premise institutional deployments for universities needing FERPA/GDPR compliance. | Depends on GPU (vLLM / TensorRT-LLM) | Infrastructure cost only |

---

### 6.3 Context Injection & System Prompt Architecture

The system prompt enforces strict psychological grounding and prevents generic, robotic advice.

#### Master System Prompt:
```markdown
You are CareerCompass AI, an elite career strategist, psychometric analyst, and educational roadmap architect.

Your objective is to generate deeply personalized, actionable, and explainable career guidance by synthesizing three distinct data vectors:
1. PSYCHOMETRIC DYNAMICS (FIRO-B 6-Vector Matrix: Expressed/Wanted Inclusion, Control, and Affection).
2. COGNITIVE & APTITUDE TRAITS (Analytical, Technical, Creative, Leadership, People scores out of 30).
3. ACADEMIC & SKILL MATRIX (Current education level, stream, grades, and existing skill tags).

RULES:
- Ground every recommendation directly in the provided user scores.
- Avoid generic encouragement; provide concrete, verified certifications, project concepts, and roadmap phases.
- Return ONLY valid JSON adhering strictly to the provided schema. No markdown wrapping outside the JSON object.
```

---

### 6.4 Structured JSON Output & Schema Enforcement

To ensure deterministic frontend rendering without parsing errors, LLMs must return structured JSON validated via Pydantic or TypeScript interfaces.

#### Target Output Schema (`CareerSynthesisResponse`):
```json
{
  "archetypeSynthesis": {
    "archetypeId": "strategic-architect",
    "personalizedTagline": "Your high analytical rigor and need for deliberate architectural control make you a natural systems strategist.",
    "keyStrengths": [
      "Decomposing distributed problems",
      "High autonomy execution",
      "Algorithmic precision"
    ],
    "workplaceCultureFit": "High-autonomy R&D squads and decentralized platform engineering teams."
  },
  "recommendedCareers": [
    {
      "careerId": "ai-ml-architect",
      "title": "AI & Machine Learning Systems Architect",
      "matchPercentage": 96,
      "explainability": {
        "cognitiveReasoning": "Your top analytical score (24/30) aligns directly with high-dimensional model tuning and mathematical optimization.",
        "firoBReasoning": "Your Expressed Control (38/54) indicates you thrive when owning system design decisions.",
        "skillSynergy": "Your existing skills in Python and SQL give you a head start, requiring only MLOps and Distributed Training to bridge the gap."
      },
      "skillDelta": {
        "possessedSkills": ["Python", "SQL", "React"],
        "missingCriticalSkills": ["PyTorch / JAX", "Kubernetes / Kubeflow", "Distributed Model Serving"],
        "estimatedTimeToBridgeMonths": 6
      },
      "customRoadmap": {
        "phase1_foundations": {
          "title": "Mathematical & Statistical Rigor",
          "milestones": ["Master Linear Algebra & Vector Calculus", "Implement Backprop from scratch in NumPy"],
          "recommendedCourses": ["DeepLearning.AI Mathematics for ML Specialization"]
        },
        "phase2_applied": {
          "title": "Scalable ML Pipelines",
          "milestones": ["Deploy LLM fine-tuning pipeline on GPU cluster", "Build end-to-end RAG with vector database"],
          "recommendedCourses": ["Full Stack Deep Learning Course"]
        },
        "phase3_mastery": {
          "title": "Enterprise System Architecture",
          "milestones": ["Achieve AWS Certified Machine Learning - Specialty", "Contribute to open-source vLLM or Hugging Face Transformers"],
          "recommendedCourses": ["Distributed Systems by MIT 6.824"]
        }
      }
    }
  ]
}
```

---

### 6.5 RAG Pipeline: Grounding in Labor Market Data

To eliminate hallucinations regarding outdated salaries, obsolete certifications, or fictional job roles, implement a **Retrieval-Augmented Generation (RAG)** pipeline:

```
[User Query + Profile] ──> [Vector Embedding Model (e.g. text-embedding-3-small)]
                                      │
                                      ▼
                      [Vector Store (ChromaDB / pgvector)]
                      ├── O*NET Career Database (900+ occupations)
                      ├── Curated University Syllabi & Prerequisites
                      └── Live Labor Market Salary & Demand Index
                                      │
                                      ▼
                      [Top 5 Retrieved Career Context Chunks]
                                      │
                                      ▼
                      [LLM Context Window with Grounded Evidence]
                                      │
                                      ▼
                      [Accurate, Fact-Checked 5-Year Blueprint]
```

---

### 6.6 LLM Evaluation, Safety, and Guardrails

To maintain clinical and ethical standards:
1. **Demographic Bias Mitigation:** Assessment inputs to the LLM must strip demographic identifiers (Age, Gender, Location) to ensure purely meritocratic, psychometric-driven recommendations.
2. **Hallucination Rate Benchmark:** Maintain $< 1\%$ hallucination on course names and salary ranges by grounding via vector retrieval.
3. **Deterministic Fallback Engine:** If the LLM API experiences rate limits or timeouts ($> 5\text{s}$), the system seamlessly falls back to the deterministic TypeScript rule engine (`AssessmentContext.tsx`), ensuring zero user disruption.
4. **Faithfulness & Relevance Scoring:** Using RAGAS or TruLens to evaluate synthetic outputs on:
   - **Context Relevance:** Are the recommended skills directly required for the role?
   - **Groundedness:** Does the explanation reference actual user score vectors?

---

### 6.7 Step-by-Step Backend Integration Code Sample

Below is a production-ready **Node.js / Express / TypeScript** integration utilizing the `@google/genai` or `@openai` SDK with structured output enforcement:

```typescript
import express, { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface SynthesisRequest {
  firoBScores: { EI: number; WI: number; EC: number; WC: number; EA: number; WA: number };
  customTraitScores: { Analytical: number; Creative: number; Leadership: number; Technical: number; People: number };
  academicDetails: {
    educationLevel: string;
    courseStream: string;
    keySubjects: string;
    gradePercentage: string;
    skillTags: string[];
  };
}

router.post('/api/synthesize-career', async (req: Request, res: Response) => {
  try {
    const { firoBScores, customTraitScores, academicDetails } = req.body as SynthesisRequest;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for high consistency and analytical precision
      }
    });

    const prompt = `
    Analyze the following user profile and return a structured JSON career recommendation matching the CareerSynthesisResponse schema.

    USER PROFILE:
    - FIRO-B Interpersonal Scores:
      * Expressed Inclusion: ${firoBScores.EI}/54, Wanted Inclusion: ${firoBScores.WI}/54
      * Expressed Control: ${firoBScores.EC}/54, Wanted Control: ${firoBScores.WC}/54
      * Expressed Affection: ${firoBScores.EA}/54, Wanted Affection: ${firoBScores.WA}/54

    - Cognitive & Scenario Trait Scores:
      * Analytical: ${customTraitScores.Analytical}/30
      * Technical: ${customTraitScores.Technical}/30
      * Creative: ${customTraitScores.Creative}/30
      * Leadership: ${customTraitScores.Leadership}/30
      * People: ${customTraitScores.People}/30

    - Academic & Skill Matrix:
      * Education: ${academicDetails.educationLevel}
      * Stream: ${academicDetails.courseStream}
      * Key Subjects: ${academicDetails.keySubjects}
      * Grades: ${academicDetails.gradePercentage}
      * Possessed Skills: ${academicDetails.skillTags.join(', ')}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsedData = JSON.parse(responseText);

    return res.status(200).json({ success: true, data: parsedData });
  } catch (error) {
    console.error('LLM Synthesis Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to synthesize career recommendations. Defaulting to algorithmic engine.',
    });
  }
});

export default router;
```

---

## 7. Future Enhancements & Scalability Roadmap

| Release | Feature | Architectural Focus |
| :--- | :--- | :--- |
| **v2.0** | **AI Resume Parser (PDF Upload)** | OCR extraction + LLM entity recognition to instantly populate user skills and identify exact gap deltas. |
| **v2.1** | **Adaptive Mock Interview Simulator** | Audio/Text streaming LLM avatar conducting role-specific behavioral interviews based on the candidate's FIRO-B archetype. |
| **v2.2** | **Alumni & Mentor Matching Network** | Cosine similarity clustering matching students with senior industry mentors possessing identical archetype trajectories. |
| **v2.3** | **Live Labor Market Pulse API** | Integration with live job APIs (LinkedIn / Indeed / Adzuna) for real-time hiring demand, top hiring hubs, and salary shifts. |

---

*Document Version: 1.0.0 | Maintainer: CareerCompass Engineering & Data Science Team | Last Updated: 2026*
