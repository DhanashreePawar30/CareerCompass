import type { FiroBSynthesisResult } from './aiService';

/** A user's saved assessment progress, as stored in MongoDB (user_progress collection). */
export interface ProgressSnapshot {
  personal: {
    name: string;
    age: string;
    gender: string;
    email: string;
    phone: string;
  };
  academic: {
    educationLevel: string;
    courseStream: string;
    keySubjects: string;
    gradePercentage: string;
    skillTags: string[];
  };
  firoBAnswers: Record<number, number>;
  customAnswers: Record<number, string>;
  firoBScores?: Record<'EI' | 'WI' | 'EC' | 'WC' | 'EA' | 'WA', number> | null;
  isFiroBComplete: boolean;
  isCustomComplete: boolean;
  firoBAiInsight: FiroBSynthesisResult | null;
  /** Client timestamp of the last change, used to pick the newer copy when syncing. */
  clientSavedAt?: number;
}

const progressUrl = (email: string) =>
  `/api/users/${encodeURIComponent(email.trim().toLowerCase())}/progress`;

/**
 * Loads saved progress from the backend.
 * Resolves to null if the user has none yet; rejects if the backend/database is unreachable.
 */
export async function fetchProgress(email: string): Promise<ProgressSnapshot | null> {
  const response = await fetch(progressUrl(email));
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to load progress (HTTP ${response.status})`);
  return (await response.json()) as ProgressSnapshot;
}

/** Saves progress to the backend (upsert). Rejects if the save fails. */
export async function saveProgress(email: string, snapshot: ProgressSnapshot, keepalive = false): Promise<void> {
  const response = await fetch(progressUrl(email), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(snapshot),
    keepalive
  });
  if (!response.ok) throw new Error(`Failed to save progress (HTTP ${response.status})`);
}
