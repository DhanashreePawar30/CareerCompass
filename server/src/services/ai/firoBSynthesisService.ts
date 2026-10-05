import {
  FiroBSynthesisRequest,
  FiroBSynthesisRequestSchema,
  FiroBSynthesisResult,
  FiroBSynthesisResultSchema
} from './firoBSchema.js';
import { getOpenAIClient, getOpenAIModel, isReasoningModel, getReasoningEffort, estimateCostUsd } from './openaiClient.js';
import { FIRO_B_SYSTEM_PROMPT, buildFiroBUserPrompt } from './firoBPrompt.js';
import { generateFiroBFallback } from './firoBFallback.js';

/** Where the synthesis came from, so clients can tell real AI output from the deterministic fallback. */
export type FiroBSynthesisResponse = FiroBSynthesisResult & {
  source: 'openai' | 'fallback';
  fallbackReason?: string;
  usage?: { model: string; inputTokens: number; outputTokens: number; estimatedCostUsd: number | null };
};

function fallback(input: FiroBSynthesisRequest, reason: string): FiroBSynthesisResponse {
  return { ...generateFiroBFallback(input), source: 'fallback', fallbackReason: reason };
}

export async function synthesizeFiroB(rawInput: unknown): Promise<FiroBSynthesisResponse> {
  // 1. Validate Input
  const parsedInputResult = FiroBSynthesisRequestSchema.safeParse(rawInput);
  if (!parsedInputResult.success) {
    console.error('[FIRO-B AI Service] Input validation failed:', parsedInputResult.error.format());
    throw new Error('Invalid FIRO-B synthesis input.');
  }

  const input: FiroBSynthesisRequest = parsedInputResult.data;
  const openai = getOpenAIClient();

  // 2. Fallback if OpenAI client is unconfigured/unavailable
  if (!openai) {
    console.log('[FIRO-B AI Service] OpenAI API key not configured or empty. Serving deterministic synthesis.');
    return fallback(input, 'openai_not_configured');
  }

  // 3. Call OpenAI Responses / Chat Completions API
  try {
    const model = getOpenAIModel();
    console.log(`[FIRO-B AI Service] Requesting synthesis from OpenAI model: ${model}`);

    const response = await openai.chat.completions.create({
      model,
      ...(isReasoningModel(model)
        ? { reasoning_effort: getReasoningEffort() as 'low' | 'medium' | 'high' }
        : { temperature: 0.4 }),
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
      return fallback(input, 'invalid_ai_output');
    }

    const inputTokens = response.usage?.prompt_tokens ?? 0;
    const outputTokens = response.usage?.completion_tokens ?? 0;
    const estimatedCostUsd = estimateCostUsd(model, inputTokens, outputTokens);
    console.log(
      `[FIRO-B AI Service] Synthesis OK — model: ${model}, tokens: ${inputTokens} in / ${outputTokens} out, ` +
      `est. cost: ${estimatedCostUsd === null ? 'unknown (model not in pricing table)' : '$' + estimatedCostUsd.toFixed(5)}`
    );
    return {
      ...parsedOutputResult.data,
      source: 'openai',
      usage: { model, inputTokens, outputTokens, estimatedCostUsd },
    };

  } catch (error) {
    console.error('[FIRO-B AI Service] Error calling OpenAI API:', error);
    console.log('[FIRO-B AI Service] Falling back to deterministic synthesis.');
    return fallback(input, 'openai_error');
  }
}
