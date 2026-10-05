import { z } from 'zod';

// Input Schemas
export const FiroBScoresInputSchema = z.object({
  EI: z.number().int().min(0).max(100),
  WI: z.number().int().min(0).max(100),
  EC: z.number().int().min(0).max(100),
  WC: z.number().int().min(0).max(100),
  EA: z.number().int().min(0).max(100),
  WA: z.number().int().min(0).max(100),
});

export const ProfileInputSchema = z.object({
  educationLevel: z.string().optional().default(''),
  courseStream: z.string().optional().default(''),
  institution: z.string().optional().default(''),
  gradePercentage: z.string().optional().default(''),
  skills: z.array(z.string()).optional().default([]),
}).optional();

export const ArchetypeInputSchema = z.object({
  id: z.string().optional().default(''),
  name: z.string().optional().default(''),
  title: z.string().optional().default(''),
}).optional();

export const CareerResultInputSchema = z.object({
  careerId: z.string().optional(),
  id: z.string().optional(),
  title: z.string().optional(),
  matchPercentage: z.number().optional(),
  matchScore: z.number().optional(),
});

export const FiroBSynthesisRequestSchema = z.object({
  firoBScores: FiroBScoresInputSchema,
  profile: ProfileInputSchema,
  archetype: ArchetypeInputSchema,
  careerResults: z.array(CareerResultInputSchema).optional().default([]),
});

export type FiroBSynthesisRequest = z.infer<typeof FiroBSynthesisRequestSchema>;

// Output Schemas
export const FiroBInterpretationSchema = z.object({
  overallProfile: z.string(),
  interpersonalStyle: z.string(),
  workStyle: z.string(),
});

export const IdentityInsightSchema = z.object({
  headline: z.string(),
  summary: z.string(),
});

export const InterpersonalProfileSchema = z.object({
  inclusion: z.string(),
  control: z.string(),
  affection: z.string(),
});

export const DimensionDetailSchema = z.object({
  summary: z.string(),
  strength: z.string(),
  developmentArea: z.string(),
});

export const FiroBDimensionsSchema = z.object({
  inclusion: DimensionDetailSchema,
  control: DimensionDetailSchema,
  affection: DimensionDetailSchema,
});

export const ArchetypeInsightSchema = z.object({
  explanation: z.string(),
  workplaceStrengths: z.array(z.string()),
  developmentAreas: z.array(z.string()),
});

export const WorkEnvironmentFitSchema = z.object({
  preferredEnvironment: z.string(),
  collaborationStyle: z.string(),
  communicationStyle: z.string(),
  responsibilityStyle: z.string(),
});

export const CareerGuidanceSchema = z.object({
  summary: z.string(),
  recommendedWorkCharacteristics: z.array(z.string()),
});

export const FiroBSynthesisResultSchema = z.object({
  firoBInterpretation: FiroBInterpretationSchema,
  identityInsight: IdentityInsightSchema,
  interpersonalProfile: InterpersonalProfileSchema,
  dimensions: FiroBDimensionsSchema,
  archetypeInsight: ArchetypeInsightSchema,
  workEnvironmentFit: WorkEnvironmentFitSchema,
  careerGuidance: CareerGuidanceSchema,
  actionableSuggestions: z.array(z.string()),
  keyStrengths: z.array(z.string()).optional().default([]),
  developmentAreas: z.array(z.string()).optional().default([]),
});

export type FiroBSynthesisResult = z.infer<typeof FiroBSynthesisResultSchema>;
