import OpenAI from 'openai';
import '../../config/env.js';

export const isOpenAIConfigured = (): boolean => {
  const apiKey = process.env.OPENAI_API_KEY;
  return Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'your_openai_api_key_here');
};

export const getOpenAIClient = (): OpenAI | null => {
  if (!isOpenAIConfigured()) {
    return null;
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY!.trim() });
};

export const getOpenAIModel = (): string => {
  return process.env.OPENAI_MODEL || 'gpt-6-luna';
};

/** Reasoning models (gpt-5+, o-series) take reasoning_effort and reject a custom temperature. */
export const isReasoningModel = (model: string): boolean => /^(gpt-5|gpt-6|o\d)/.test(model) && !model.includes('chat');

export const getReasoningEffort = (): string => {
  return process.env.OPENAI_REASONING_EFFORT || 'low';
};

/** Standard-tier USD per 1M tokens [input, output], for cost logging only. */
const PRICING: Record<string, [number, number]> = {
  'gpt-6-luna': [0.10, 0.50],
  'gpt-5.6-luna': [0.20, 1.20],
  'gpt-5-nano': [0.05, 0.40],
  'gpt-5-mini': [0.25, 2.00],
  'gpt-4.1-nano': [0.10, 0.40],
  'gpt-4.1-mini': [0.40, 1.60],
  'gpt-4o-mini': [0.15, 0.60],
};

export const estimateCostUsd = (model: string, inputTokens: number, outputTokens: number): number | null => {
  const price = PRICING[model];
  if (!price) return null;
  return (inputTokens * price[0] + outputTokens * price[1]) / 1_000_000;
};
