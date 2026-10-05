import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export const getOpenAIClient = (): OpenAI | null => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openai_api_key_here') {
    return null;
  }
  return new OpenAI({ apiKey: apiKey.trim() });
};

export const getOpenAIModel = (): string => {
  return process.env.OPENAI_MODEL || 'gpt-4o-mini';
};
