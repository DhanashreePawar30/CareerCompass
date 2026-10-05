import { FIRO_B_QUESTIONS } from './firoBQuestions';

export const FIRO_B_DIMENSIONS = ['EI', 'WI', 'EC', 'WC', 'EA', 'WA'] as const;

export type FiroBDimension = typeof FIRO_B_DIMENSIONS[number];
export type FiroBScores = Record<FiroBDimension, number>;

export interface FiroBScoreSet {
  rawScores: FiroBScores;
  normalizedScores: FiroBScores;
  displayScores: FiroBScores;
}

const createEmptyScores = (): FiroBScores => ({
  EI: 0,
  WI: 0,
  EC: 0,
  WC: 0,
  EA: 0,
  WA: 0
});

export function calculateFiroBScores(answers: Record<number, number>): FiroBScoreSet {
  const rawScores = createEmptyScores();
  const answeredCounts = createEmptyScores();

  FIRO_B_QUESTIONS.forEach(question => {
    const response = answers[question.id];
    if (Number.isInteger(response) && response >= 1 && response <= 6) {
      rawScores[question.category] += response;
      answeredCounts[question.category] += 1;
    }
  });

  const normalizedScores = createEmptyScores();
  const displayScores = createEmptyScores();
  FIRO_B_DIMENSIONS.forEach(dimension => {
    if (answeredCounts[dimension] === 9) {
      const mean = rawScores[dimension] / answeredCounts[dimension];
      normalizedScores[dimension] = Math.round(((mean - 1) / 5) * 100);
      displayScores[dimension] = Number(((rawScores[dimension] - 9) / 5).toFixed(1));
    }
  });

  return { rawScores, normalizedScores, displayScores };
}
