import mongoose, { Schema, Document } from 'mongoose';

// ──────────────────────────────────────────
// Enums
// ──────────────────────────────────────────
export const UserRole = ['student', 'professional', 'counselor', 'admin'] as const;
export const SessionStatus = ['in_progress', 'completed', 'abandoned'] as const;
export const EducationLevel = ['high_school', 'undergrad_year_1_2', 'undergrad_year_3_4', 'postgraduate', 'working_professional'] as const;
export const SkillCategory = ['Technical', 'Soft', 'Analytical', 'Domain', 'Tools'] as const;
export const FiroBCategory = ['EI', 'WI', 'EC', 'WC', 'EA', 'WA'] as const;
export const CogTrait = ['Analytical', 'Technical', 'Creative', 'Leadership', 'People'] as const;

// ──────────────────────────────────────────
// 1. User
// ──────────────────────────────────────────
export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  authProvider: string;
  authProviderId?: string;
  role: typeof UserRole[number];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email:          { type: String, required: true, unique: true, index: true },
  passwordHash:   { type: String, default: null },
  authProvider:   { type: String, default: 'local' },
  authProviderId: { type: String, default: null },
  role:           { type: String, enum: UserRole, default: 'student' },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);

// ──────────────────────────────────────────
// 2. Assessment Session
// ──────────────────────────────────────────
export interface IAssessmentSession extends Document {
  sessionToken: string;
  userId?: mongoose.Types.ObjectId;
  status: typeof SessionStatus[number];
  isFiroBComplete: boolean;
  isCustomComplete: boolean;
  startedAt: Date;
  completedAt?: Date;
}

const AssessmentSessionSchema = new Schema<IAssessmentSession>({
  sessionToken:   { type: String, required: true, unique: true, index: true },
  userId:         { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
  status:         { type: String, enum: SessionStatus, default: 'in_progress' },
  isFiroBComplete:  { type: Boolean, default: false },
  isCustomComplete: { type: Boolean, default: false },
  startedAt:      { type: Date, default: Date.now },
  completedAt:    { type: Date, default: null },
}, { timestamps: true });

export const AssessmentSession = mongoose.model<IAssessmentSession>('AssessmentSession', AssessmentSessionSchema);

// ──────────────────────────────────────────
// 3. Student Profile
// ──────────────────────────────────────────
export interface IStudentProfile extends Document {
  userId?: mongoose.Types.ObjectId;
  sessionId?: mongoose.Types.ObjectId;
  fullName: string;
  phone?: string;
  age?: number;
  gender?: string;
  educationLevel: typeof EducationLevel[number];
  courseStream: string;
  keySubjects?: string;
  gradePercentageOrCgpa?: string;
}

const StudentProfileSchema = new Schema<IStudentProfile>({
  userId:       { type: Schema.Types.ObjectId, ref: 'User', unique: true, sparse: true },
  sessionId:    { type: Schema.Types.ObjectId, ref: 'AssessmentSession', default: null },
  fullName:     { type: String, required: true },
  phone:        { type: String, default: null },
  age:          { type: Number, default: null },
  gender:       { type: String, default: null },
  educationLevel: { type: String, enum: EducationLevel, required: true },
  courseStream:   { type: String, required: true },
  keySubjects:   { type: String, default: null },
  gradePercentageOrCgpa: { type: String, default: null },
}, { timestamps: true });

export const StudentProfile = mongoose.model<IStudentProfile>('StudentProfile', StudentProfileSchema);

// ──────────────────────────────────────────
// 4. Skills
// ──────────────────────────────────────────
export interface ISkill extends Document {
  name: string;
  category: typeof SkillCategory[number];
  isPopular: boolean;
}

const SkillSchema = new Schema<ISkill>({
  name:      { type: String, required: true, unique: true, index: true },
  category:  { type: String, enum: SkillCategory, default: 'Technical' },
  isPopular: { type: Boolean, default: false },
});

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);

// ──────────────────────────────────────────
// 5. User Skills (junction)
// ──────────────────────────────────────────
export interface IUserSkill extends Document {
  userId: mongoose.Types.ObjectId;
  skillId: mongoose.Types.ObjectId;
  proficiencyLevel: string;
}

const UserSkillSchema = new Schema<IUserSkill>({
  userId:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  skillId: { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
  proficiencyLevel: { type: String, default: 'intermediate' },
}, { timestamps: true });

UserSkillSchema.index({ userId: 1, skillId: 1 }, { unique: true });

export const UserSkill = mongoose.model<IUserSkill>('UserSkill', UserSkillSchema);

// ──────────────────────────────────────────
// 6. FIRO-B Questions, Responses, Scores
// ──────────────────────────────────────────
export interface IFiroBQuestion extends Document {
  questionText: string;
  category: typeof FiroBCategory[number];
  categoryLabel: string;
  orderIndex: number;
}

const FiroBQuestionSchema = new Schema<IFiroBQuestion>({
  questionText:  { type: String, required: true },
  category:      { type: String, enum: FiroBCategory, required: true },
  categoryLabel: { type: String, required: true },
  orderIndex:    { type: Number, required: true },
});

export const FiroBQuestion = mongoose.model<IFiroBQuestion>('FiroBQuestion', FiroBQuestionSchema);

export interface IFiroBResponse extends Document {
  sessionId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  score: number;
}

const FiroBResponseSchema = new Schema<IFiroBResponse>({
  sessionId:  { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'FiroBQuestion', required: true },
  score:      { type: Number, required: true },
}, { timestamps: true });

FiroBResponseSchema.index({ sessionId: 1, questionId: 1 }, { unique: true });

export const FiroBResponse = mongoose.model<IFiroBResponse>('FiroBResponse', FiroBResponseSchema);

export interface IFiroBScore extends Document {
  sessionId: mongoose.Types.ObjectId;
  eiScore: number;
  wiScore: number;
  ecScore: number;
  wcScore: number;
  eaScore: number;
  waScore: number;
  calculatedAt: Date;
}

const FiroBScoreSchema = new Schema<IFiroBScore>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true, unique: true },
  eiScore:   { type: Number, default: 0 },
  wiScore:   { type: Number, default: 0 },
  ecScore:   { type: Number, default: 0 },
  wcScore:   { type: Number, default: 0 },
  eaScore:   { type: Number, default: 0 },
  waScore:   { type: Number, default: 0 },
  calculatedAt: { type: Date, default: Date.now },
});

export const FiroBScore = mongoose.model<IFiroBScore>('FiroBScore', FiroBScoreSchema);

// ──────────────────────────────────────────
// 7. Cognitive Questions, Options, Responses, Trait Scores
// ──────────────────────────────────────────
export interface ICognitiveQuestion extends Document {
  questionText: string;
  section: string;
  questionType: string;
  orderIndex: number;
}

const CognitiveQuestionSchema = new Schema<ICognitiveQuestion>({
  questionText: { type: String, required: true },
  section:      { type: String, required: true },
  questionType: { type: String, required: true },
  orderIndex:   { type: Number, required: true },
});

export const CognitiveQuestion = mongoose.model<ICognitiveQuestion>('CognitiveQuestion', CognitiveQuestionSchema);

export interface ICognitiveOption extends Document {
  questionId: mongoose.Types.ObjectId;
  optionText: string;
  trait: typeof CogTrait[number];
  weight: number;
}

const CognitiveOptionSchema = new Schema<ICognitiveOption>({
  questionId: { type: Schema.Types.ObjectId, ref: 'CognitiveQuestion', required: true },
  optionText: { type: String, required: true },
  trait:      { type: String, enum: CogTrait, required: true },
  weight:     { type: Number, default: 1 },
});

export const CognitiveOption = mongoose.model<ICognitiveOption>('CognitiveOption', CognitiveOptionSchema);

export interface ICognitiveResponse extends Document {
  sessionId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  selectedOptionId: mongoose.Types.ObjectId;
}

const CognitiveResponseSchema = new Schema<ICognitiveResponse>({
  sessionId:       { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true },
  questionId:      { type: Schema.Types.ObjectId, ref: 'CognitiveQuestion', required: true },
  selectedOptionId: { type: Schema.Types.ObjectId, ref: 'CognitiveOption', required: true },
}, { timestamps: true });

CognitiveResponseSchema.index({ sessionId: 1, questionId: 1 }, { unique: true });

export const CognitiveResponse = mongoose.model<ICognitiveResponse>('CognitiveResponse', CognitiveResponseSchema);

export interface ITraitScore extends Document {
  sessionId: mongoose.Types.ObjectId;
  analytical: number;
  technical: number;
  creative: number;
  leadership: number;
  people: number;
  calculatedAt: Date;
}

const TraitScoreSchema = new Schema<ITraitScore>({
  sessionId:  { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true, unique: true },
  analytical: { type: Number, default: 0 },
  technical:  { type: Number, default: 0 },
  creative:   { type: Number, default: 0 },
  leadership: { type: Number, default: 0 },
  people:     { type: Number, default: 0 },
  calculatedAt: { type: Date, default: Date.now },
});

export const TraitScore = mongoose.model<ITraitScore>('TraitScore', TraitScoreSchema);

// ──────────────────────────────────────────
// 8. Archetypes & User Archetype Results
// ──────────────────────────────────────────
export interface IArchetype extends Document {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  strengths: string[];
  workplaceVibe: string;
  recommendedRoleTitle: string;
  colorScheme: Record<string, string>;
}

const ArchetypeSchema = new Schema<IArchetype>({
  slug:          { type: String, required: true, unique: true },
  title:         { type: String, required: true },
  badge:         { type: String, required: true },
  tagline:       { type: String, required: true },
  description:   { type: String, required: true },
  strengths:     { type: [String], required: true },
  workplaceVibe: { type: String, required: true },
  recommendedRoleTitle: { type: String, required: true },
  colorScheme:   { type: Schema.Types.Mixed, required: true },
});

export const Archetype = mongoose.model<IArchetype>('Archetype', ArchetypeSchema);

export interface IUserArchetypeResult extends Document {
  sessionId: mongoose.Types.ObjectId;
  archetypeId: mongoose.Types.ObjectId;
  confidenceScore: number;
  derivedAt: Date;
}

const UserArchetypeResultSchema = new Schema<IUserArchetypeResult>({
  sessionId:       { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true, unique: true },
  archetypeId:     { type: Schema.Types.ObjectId, ref: 'Archetype', required: true },
  confidenceScore: { type: Number, default: 95 },
  derivedAt:       { type: Date, default: Date.now },
});

export const UserArchetypeResult = mongoose.model<IUserArchetypeResult>('UserArchetypeResult', UserArchetypeResultSchema);

// ──────────────────────────────────────────
// 9. Career Clusters, Profiles, Required Skills, Recommendations
// ──────────────────────────────────────────
export interface ICareerCluster extends Document {
  name: string;
  slug: string;
  iconName: string;
  description: string;
}

const CareerClusterSchema = new Schema<ICareerCluster>({
  name:        { type: String, required: true, unique: true },
  slug:        { type: String, required: true, unique: true },
  iconName:    { type: String, required: true },
  description: { type: String, required: true },
});

export const CareerCluster = mongoose.model<ICareerCluster>('CareerCluster', CareerClusterSchema);

export interface ICareerProfile extends Document {
  slug: string;
  clusterId: mongoose.Types.ObjectId;
  title: string;
  summary: string;
  description: string;
  salaryEntry: string;
  salaryMid: string;
  salarySenior: string;
  workEnvironment: string;
  growthRate: string;
}

const CareerProfileSchema = new Schema<ICareerProfile>({
  slug:            { type: String, required: true, unique: true },
  clusterId:       { type: Schema.Types.ObjectId, ref: 'CareerCluster', required: true },
  title:           { type: String, required: true },
  summary:         { type: String, required: true },
  description:     { type: String, required: true },
  salaryEntry:     { type: String, required: true },
  salaryMid:       { type: String, required: true },
  salarySenior:    { type: String, required: true },
  workEnvironment: { type: String, required: true },
  growthRate:      { type: String, default: '+22% (High Demand)' },
});

export const CareerProfile = mongoose.model<ICareerProfile>('CareerProfile', CareerProfileSchema);

export interface ICareerRequiredSkill extends Document {
  careerId: mongoose.Types.ObjectId;
  skillId: mongoose.Types.ObjectId;
  isMandatory: boolean;
}

const CareerRequiredSkillSchema = new Schema<ICareerRequiredSkill>({
  careerId:    { type: Schema.Types.ObjectId, ref: 'CareerProfile', required: true },
  skillId:     { type: Schema.Types.ObjectId, ref: 'Skill', required: true },
  isMandatory: { type: Boolean, default: true },
});

CareerRequiredSkillSchema.index({ careerId: 1, skillId: 1 }, { unique: true });

export const CareerRequiredSkill = mongoose.model<ICareerRequiredSkill>('CareerRequiredSkill', CareerRequiredSkillSchema);

export interface IUserCareerRecommendation extends Document {
  sessionId: mongoose.Types.ObjectId;
  careerId: mongoose.Types.ObjectId;
  rankOrder: number;
  matchScore: number;
  whyMatchReasons: string[];
  generatedAt: Date;
}

const UserCareerRecommendationSchema = new Schema<IUserCareerRecommendation>({
  sessionId:       { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true },
  careerId:        { type: Schema.Types.ObjectId, ref: 'CareerProfile', required: true },
  rankOrder:       { type: Number, required: true },
  matchScore:      { type: Number, required: true },
  whyMatchReasons: { type: [String], required: true },
  generatedAt:     { type: Date, default: Date.now },
});

UserCareerRecommendationSchema.index({ sessionId: 1, careerId: 1 }, { unique: true });
UserCareerRecommendationSchema.index({ sessionId: 1, matchScore: -1 });

export const UserCareerRecommendation = mongoose.model<IUserCareerRecommendation>('UserCareerRecommendation', UserCareerRecommendationSchema);

// ──────────────────────────────────────────
// 10. Comparisons, Roadmaps, Milestones, Progress
// ──────────────────────────────────────────
export interface IUserCareerComparison extends Document {
  sessionId: mongoose.Types.ObjectId;
  careerId: mongoose.Types.ObjectId;
}

const UserCareerComparisonSchema = new Schema<IUserCareerComparison>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'AssessmentSession', required: true },
  careerId:  { type: Schema.Types.ObjectId, ref: 'CareerProfile', required: true },
}, { timestamps: true });

UserCareerComparisonSchema.index({ sessionId: 1, careerId: 1 }, { unique: true });

export const UserCareerComparison = mongoose.model<IUserCareerComparison>('UserCareerComparison', UserCareerComparisonSchema);

export interface ICareerRoadmap extends Document {
  careerId: mongoose.Types.ObjectId;
  phaseNumber: number;
  phaseTitle: string;
  durationMonths: string;
  phaseFocus: string;
}

const CareerRoadmapSchema = new Schema<ICareerRoadmap>({
  careerId:       { type: Schema.Types.ObjectId, ref: 'CareerProfile', required: true },
  phaseNumber:    { type: Number, required: true },
  phaseTitle:     { type: String, required: true },
  durationMonths: { type: String, required: true },
  phaseFocus:     { type: String, required: true },
});

export const CareerRoadmap = mongoose.model<ICareerRoadmap>('CareerRoadmap', CareerRoadmapSchema);

export interface IRoadmapMilestone extends Document {
  roadmapId: mongoose.Types.ObjectId;
  milestoneTitle: string;
  resourceRecommendation?: string;
  orderIndex: number;
}

const RoadmapMilestoneSchema = new Schema<IRoadmapMilestone>({
  roadmapId:              { type: Schema.Types.ObjectId, ref: 'CareerRoadmap', required: true },
  milestoneTitle:         { type: String, required: true },
  resourceRecommendation: { type: String, default: null },
  orderIndex:             { type: Number, required: true },
});

export const RoadmapMilestone = mongoose.model<IRoadmapMilestone>('RoadmapMilestone', RoadmapMilestoneSchema);

export interface IUserMilestoneProgress extends Document {
  userId: mongoose.Types.ObjectId;
  milestoneId: mongoose.Types.ObjectId;
  isCompleted: boolean;
  completedAt: Date;
}

const UserMilestoneProgressSchema = new Schema<IUserMilestoneProgress>({
  userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
  milestoneId: { type: Schema.Types.ObjectId, ref: 'RoadmapMilestone', required: true },
  isCompleted: { type: Boolean, default: true },
  completedAt: { type: Date, default: Date.now },
});

UserMilestoneProgressSchema.index({ userId: 1, milestoneId: 1 }, { unique: true });

export const UserMilestoneProgress = mongoose.model<IUserMilestoneProgress>('UserMilestoneProgress', UserMilestoneProgressSchema);

// ──────────────────────────────────────────
// User Progress (one document per account; what the frontend saves and restores on login)
// ──────────────────────────────────────────
export interface IUserProgress extends Document {
  email: string;
  personal: Record<string, string>;
  academic: Record<string, unknown>;
  firoBAnswers: Record<string, number>;
  customAnswers: Record<string, string>;
  firoBScores: Record<string, number> | null;
  firoBScoreVersion?: 'normalized-v1';
  isFiroBComplete: boolean;
  isCustomComplete: boolean;
  firoBAiInsight: Record<string, unknown> | null;
  clientSavedAt: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>({
  email:            { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  personal:         { type: Schema.Types.Mixed, default: {} },
  academic:         { type: Schema.Types.Mixed, default: {} },
  firoBAnswers:     { type: Schema.Types.Mixed, default: {} },
  customAnswers:    { type: Schema.Types.Mixed, default: {} },
  firoBScores:      { type: Schema.Types.Mixed, default: null },
  firoBScoreVersion:{ type: String, enum: ['normalized-v1'] },
  isFiroBComplete:  { type: Boolean, default: false },
  isCustomComplete: { type: Boolean, default: false },
  firoBAiInsight:   { type: Schema.Types.Mixed, default: null },
  clientSavedAt:    { type: Number, default: 0 },
}, { timestamps: true, minimize: false, collection: 'user_progress' });

export const UserProgress = mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
