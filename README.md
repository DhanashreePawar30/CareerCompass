# 🧭 CareerCompass

> **AI-Powered Diagnostic & Trajectory Navigation Platform**  
> *Guiding students and professionals from psychometric self-discovery to actionable 5-year career blueprints.*

---

## 📚 Complete Project Documentation

- 🗺️ **[Complete Project & File Structure Guide](./PROJECT_STRUCTURE.md)**: Categorized breakdown of UI files, Database models, Backend API files, and Integration state bridges.
- 📖 **[Master Project, Diagnostics & LLM Implementation Guide](./CAREERCOMPASS_PROJECT_AND_LLM_GUIDE.md)**: Full architecture, user journey, the 84-question test battery (FIRO-B + Cognitive scenarios), QA validation test suites, and the end-to-end LLM integration blueprint.
- ⚙️ **[Feature Specifications & UI Architecture](./CAREERCOMPASS_FEATURES.md)**: Breakdown of all product phases, Awwwards-level GSAP motion physics, dynamic career archetypes, and interactive tools.
- 🗄️ **[Database Architecture & Schemas](./CAREERCOMPASS_DATABASE_SCHEMA.md)**: Complete database specifications, ERD diagrams, and seed datasets.

---

## 🚀 Quick Start (Development)

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev
# Server starts at http://localhost:5000 (MongoDB auto-connects)
```

### 2. Start the Frontend Web App
```bash
cd CareerCompass
npm install
npm run dev
# Web App starts at http://localhost:5173
```

---

## 🧩 Architectural File Layers

| Layer | Primary Location | What it Contains |
| :--- | :--- | :--- |
| **🎨 UI Layer** | `CareerCompass/src/pages/`, `src/components/` | All React pages (Landing, Login, Dashboard, Assessment, Explorer) and UI elements. |
| **🗄️ Database Layer** | `server/src/models/`, `server/src/config/db.ts` | MongoDB Mongoose collections (`users`, `assessments`) and connection setup. |
| **⚡ Backend API Layer** | `server/src/controllers/`, `server/src/routes/` | Express REST API endpoints (`/api/auth`, `/api/profile`, `/api/assessment`). |
| **🌉 State & Bridge Layer**| `CareerCompass/src/context/` | `AuthContext.tsx` and `AssessmentContext.tsx` linking UI to database endpoints. |
| **📦 Static Data Layer** | `CareerCompass/src/data/` | Hardcoded question banks (`firoBQuestions`, `customQuestions`) and `careerDatabase`. |
