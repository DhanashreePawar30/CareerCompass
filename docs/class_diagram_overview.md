# 🧭 CareerCompass UML Class Diagram

Here is the architectural class diagram illustrating all database entities, relations, attribute data types, and domain modules based on [`CAREERCOMPASS_DATABASE_SCHEMA.md`](file:///c:/Users/Tanishka%20Pawar/Documents/EDI/CareerCompass/CAREERCOMPASS_DATABASE_SCHEMA.md).

---

## 🖼️ Architectural Diagram

![CareerCompass UML Class Diagram](C:/Users/Tanishka%20Pawar/.gemini/antigravity-ide/brain/3b14a4e1-212f-4817-a08a-b76ba857c068/careercompass_class_diagram_1791190590990.jpg)

---

## 🧩 Domain Structure Summary

### 🟢 1. Auth & Identity
- **`User`**: Account identity, authentication provider, user role (`student`, `professional`, `counselor`, `admin`).
- **`StudentProfile`**: Educational tier, stream, major subjects, and CGPA/grade baseline.
- **`Skill` & `UserSkill`**: Tagged competencies and proficiency levels.

### 🔵 2. Diagnostic Assessment Engine
- **`AssessmentSession`**: Zero-friction session tracking, test completion flags, and temporal markers.
- **`FiroBQuestion`, `FiroBResponse`, `FiroBScore`**: 54-item psychometric inventory yielding 6 interpersonal dimensions ($EI, WI, EC, WC, EA, WA$).
- **`CognitiveQuestion`, `CognitiveOption`, `CognitiveResponse`, `TraitScore`**: 30-item scenario battery yielding 5 traits (*Analytical*, *Technical*, *Creative*, *Leadership*, *People*).

### 🟣 3. Synthesis & Archetypes
- **`Archetype`**: 4 foundational personas (*Strategic Systems Architect*, *Collaborative Catalyst*, *Quantitative Data Pioneer*, *Creative Experience Technologist*).
- **`UserArchetypeResult`**: Derived persona classification and confidence rating.

### 🟡 4. Career Intelligence
- **`CareerCluster`**: High-level domains (e.g. *Data & Analytics*, *Software & Cloud*).
- **`CareerProfile` & `CareerRequiredSkill`**: Detailed job profiles, market salary bands (Entry/Mid/Senior), and required skills.
- **`UserCareerRecommendation`**: Match percentages ($65\% - 99\%$) with explainable AI reasoning tags.

### 🔴 5. Trajectory & Roadmaps
- **`UserCareerComparison`**: Multi-role side-by-side comparison slots.
- **`CareerRoadmap` & `RoadmapMilestone`**: 5-Year phased progression milestones and recommended course certifications.
- **`UserMilestoneProgress`**: User completion tracking per roadmap milestone.
