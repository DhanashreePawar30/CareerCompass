# 🧭 CareerCompass: Complete Project & File Structure Guide

This document clearly categorizes and explains every file and directory in the project by its responsibility: **Frontend UI**, **Database**, **Backend API**, **State & Integration**, and **Configuration**.

---

## 🏗️ High-Level Architectural Layers

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    1. FRONTEND / UI LAYER (React 18 + Vite)             │
│   LandingPage, Questionnaires, Processing, Dashboard, Recommendations   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (HTTP / JSON / Cookies)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    2. STATE & BRIDGE LAYER (Context API)                │
│       AuthContext.tsx  ◄────────────────────────►  AssessmentContext.tsx │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (REST API: /api/auth, /api/assessment)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    3. BACKEND & API LAYER (Express + TypeScript)        │
│       Controllers, Routes, Auth Middleware, AI Neural Synthesis Service │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (Mongoose ODM)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    4. DATABASE & DATA MODELS LAYER                      │
│       MongoDB: `users` & `assessments`  |  Static Data: `careerDatabase`│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Detailed Categorized Directory Map

### 1️⃣ Frontend / UI Layer (`CareerCompass/src/`)
*These files define everything the user sees, clicks, and interacts with on screen.*

| Folder / File | Type | Purpose & Responsibility |
| :--- | :--- | :--- |
| **`CareerCompass/src/pages/`** | **UI Pages** | **Main application route pages:** |
| ├── `LandingPage.tsx` | UI Page | Homepage with Hero, live trait simulator widget, and value propositions. |
| ├── `LoginPage.tsx` | UI Page | User sign-in interface with email & password. |
| ├── `RegisterPage.tsx` | UI Page | User account creation interface. |
| ├── `AssessmentHubPage.tsx` | UI Page | Test launch center showing progress across the 2 assessment modules. |
| ├── `FiroBQuestionPage.tsx` | UI Page | 54-item psychometric Likert scale assessment flow. |
| ├── `CustomQuestionPage.tsx`| UI Page | 30-item cognitive & scenario multiple choice flow. |
| ├── `ProcessingPage.tsx` | UI Page | Live 4-step synthesis animation and confetti trigger upon test completion. |
| ├── `UnlockProfilePage.tsx` | UI Page | Derived Archetype card reveal + Academic stream and skill tagging form. |
| ├── `DashboardPage.tsx` | UI Page | Trait radar, FIRO-B bars, saved AI Neural Synthesis insights, #1 career match. |
| ├── `RecommendationsPage.tsx`| UI Page | Ranked career clusters, explainability breakdowns, comparison launcher. |
| ├── `CareerDetailsPage.tsx` | UI Page | 5-Year deep-dive blueprint, salary breakdown, and milestone roadmap. |
| ├── `ProfilePage.tsx` | UI Page | User profile view and skill management. |
| ├── `HowItWorksPage.tsx` | UI Page | Educational explainer on FIRO-B and CareerCompass methodology. |
| **`CareerCompass/src/components/`** | **UI Components** | **Reusable visual UI elements:** |
| ├── `Navbar.tsx` | Component | Top sticky header with Logo, Demo User button, Auth status, and Logout. |
| ├── `Footer.tsx` | Component | Editorial footer with newsletter and links. |
| ├── `ArchetypeCard.tsx` | Component | Shareable persona card displaying user badge and strengths. |
| ├── `ComparisonDrawer.tsx` | Component | Slide-over drawer comparing up to 3 careers side-by-side. |
| ├── `CursorGlow.tsx` | Component | Ambient glowing mouse follower effect. |
| ├── `MagneticButton.tsx` | Component | Elastic spring physics button on cursor hover. |
| ├── `MetricCounter.tsx` | Component | Animated counter for landing page statistics. |
| ├── `SpotlightCard.tsx` | Component | Radial light spotlight effect on card hover. |
| ├── `ProtectedRoute.tsx` | Component | Route guard redirecting unauthenticated users to `/login`. |
| ├── `SmoothScroll.tsx` | Component | Lenis smooth inertial scrolling wrapper. |
| **`CareerCompass/src/App.tsx`** | **Routing** | Master router configuring all page URLs and providers. |
| **`CareerCompass/src/index.css`** | **Styles** | Global design tokens, color variables, keyframes, custom scrollbars. |

---

### 2️⃣ Database & Data Models Layer (`server/src/models/` & `CareerCompass/src/data/`)
*These files define how user data is structured and saved in MongoDB, plus static question banks.*

| Folder / File | Type | Purpose & Responsibility |
| :--- | :--- | :--- |
| **`server/src/config/db.ts`** | **DB Setup** | Connects to MongoDB (`MONGODB_URI`) with automatic in-memory fallback for local dev. |
| **`server/src/models/User.ts`** | **DB Model** | **`users` MongoDB collection**: Account credentials (hashed password), timestamps, embedded profile. |
| **`server/src/models/Assessment.ts`** | **DB Model** | **`assessments` MongoDB collection**: Saved FIRO-B answers, 6 scores, archetype, career matches, and embedded AI synthesis. |
| **`CareerCompass/src/data/`** | **Static Data** | **Hardcoded question banks and verified career catalog:** |
| ├── `careerDatabase.ts` | Data File | 12+ verified careers across 5 clusters with salaries, skills, and 5-year roadmaps. |
| ├── `firoBQuestions.ts` | Data File | 54 custom FIRO-B-based interpersonal questions. |
| ├── `customQuestions.ts` | Data File | 30 cognitive and scenario multiple choice questions. |
| └── `archetypes.ts` | Data File | 4 core career archetypes and the deterministic classification formula. |

---

### 3️⃣ Backend & API Layer (`server/src/`)
*These files handle server requests, user authentication, database CRUD operations, and AI generation.*

| Folder / File | Type | Purpose & Responsibility |
| :--- | :--- | :--- |
| **`server/src/server.ts`** | **Server Entry** | Express server entrypoint listening on port `5000`, setting up CORS and cookies. |
| **`server/src/middleware/auth.ts`** | **Security** | Protects API routes by verifying JWT tokens from secure HTTP-only cookies. |
| **`server/src/controllers/`** | **API Logic** | **Request handlers:** |
| ├── `authController.ts` | Controller | Handles `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`. |
| ├── `profileController.ts` | Controller | Handles `GET /api/profile` and `PUT /api/profile`. |
| └── `assessmentController.ts`| Controller | Handles `GET /api/assessment/latest` and `POST /api/assessment`. |
| **`server/src/routes/`** | **API Routing**| **Express Route Definitions:** |
| ├── `authRoutes.ts` | Routes | Routes for authentication. |
| ├── `profileRoutes.ts` | Routes | Routes for profile management. |
| └── `assessmentRoutes.ts` | Routes | Routes for assessment saving/loading. |
| **`server/src/services/aiService.ts`** | **AI Engine** | Generates AI Neural Synthesis (via OpenAI API or psychometric fallback). |
| **`server/src/test_api.ts`** | **Testing** | Automated 10-point test suite for verifying backend endpoints and security. |

---

### 4️⃣ State & Bridge Layer (`CareerCompass/src/context/`)
*These files act as the bridge connecting the Frontend UI with the Backend & Database.*

| File | Type | Purpose & Responsibility |
| :--- | :--- | :--- |
| **`CareerCompass/src/context/AuthContext.tsx`** | **Auth Bridge** | Holds user login session in React state; calls `/api/auth/me`, `/api/auth/login`, `/api/auth/logout`. |
| **`CareerCompass/src/context/AssessmentContext.tsx`** | **Data Bridge** | Calculates live test scores, computes career rankings, and syncs results to/from MongoDB (`/api/assessment`). |
| **`CareerCompass/vite.config.ts`** | **Proxy Bridge**| Proxies `/api` calls from Vite port `5173` to Express backend port `5000`. |

---

### 5️⃣ Configuration & Environment Files
*Root and project-level configurations.*

| File | Purpose |
| :--- | :--- |
| **`package.json`** (Root) | Workspace proxy scripts (`npm run dev`, `npm run build`, `npm run preview`). |
| **`server/.env`** | Backend environment variables (`PORT=5000`, `MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY`). |
| **`server/.env.example`** | Template for backend environment variables. |
| **`CareerCompass/package.json`**| Frontend dependencies (React, Vite, GSAP, Recharts, Tailwind CSS, Lucide). |
| **`server/package.json`** | Backend dependencies (Express, Mongoose, Bcrypt, JWT, Cookie-Parser, OpenAI). |
| **`CAREERCOMPASS_PROJECT_AND_LLM_GUIDE.md`** | Complete project documentation, diagnostic test battery, and LLM implementation guide. |
| **`CAREERCOMPASS_DATABASE_SCHEMA.md`** | Production database specifications, ERD, and SQL/Prisma references. |
| **`PROJECT_STRUCTURE.md`** | This categorization and file structure map. |
