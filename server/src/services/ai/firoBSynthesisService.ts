import {
  FiroBSynthesisRequest,
  FiroBSynthesisRequestSchema,
  FiroBSynthesisResult,
  FiroBSynthesisResultSchema
} from './firoBSchema.js';
import { getOpenAIClient, getOpenAIModel } from './openaiClient.js';
import { FIRO_B_SYSTEM_PROMPT, buildFiroBUserPrompt } from './firoBPrompt.js';
import { generateFiroBFallback } from './firoBFallback.js';

export async function synthesizeFiroB(rawInput: unknown): Promise<FiroBSynthesisResult> {
  // 1. Validate Input
  const parsedInputResult = FiroBSynthesisRequestSchema.safeParse(rawInput);
  if (!parsedInputResult.success) {
    console.warn('[FIRO-B AI Service] Input validation failed. Falling back to deterministic engine:', parsedInputResult.error.format());
    // Use fallback for invalid input structure if firoBScores are present or partially missing
    const defaultScores = (rawInput as any)?.firoBScores || { EI: 0, WI: 0, EC: 0, WC: 0, EA: 0, WA: 0 };
    return generateFiroBFallback({
      firoBScores: defaultScores,
      profile: (rawInput as any)?.profile,
      archetype: (rawInput as any)?.archetype,
      careerResults: (rawInput as any)?.careerResults || []
    });
  }

  const input: FiroBSynthesisRequest = parsedInputResult.data;
  const openai = getOpenAIClient();

  // 2. Fallback if OpenAI client is unconfigured/unavailable
  if (!openai) {
    console.log('[FIRO-B AI Service] OpenAI API key not configured or empty. Serving deterministic synthesis.');
    return generateFiroBFallback(input);
  }

  // 3. Call OpenAI Responses / Chat Completions API
  try {
    const model = getOpenAIModel();
    console.log(`[FIRO-B AI Service] Requesting synthesis from OpenAI model: ${model}`);

    const response = await openai.chat.completions.create({
      model,
      temperature: 0.4,
      messages: [
        { role: 'system', content: FIRO_B_SYSTEM_PROMPT },
        { role: 'user', content: buildFiroBUserPrompt(input) }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Received empty content from OpenAI response.');
    }

    const rawJson = JSON.parse(content);

    // 4. Validate output with Zod schema
    const parsedOutputResult = FiroBSynthesisResultSchema.safeParse(rawJson);
    if (!parsedOutputResult.success) {
      console.error('[FIRO-B AI Service] OpenAI output schema validation failed:', parsedOutputResult.error.format());
      console.log('[FIRO-B AI Service] Falling back to deterministic synthesis.');
      return generateFiroBFallback(input);
    }

    console.log('[FIRO-B AI Service] Successfully synthesized and validated AI FIRO-B insights.');
    return parsedOutputResult.data;

  } catch (error) {
    console.error('[FIRO-B AI Service] Error calling OpenAI API:', error);
    console.log('[FIRO-B AI Service] Falling back to deterministic synthesis.');
    return generateFiroBFallback(input);
  }
}
