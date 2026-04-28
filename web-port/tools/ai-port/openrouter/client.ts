import type { AiPortTiming } from '../types';

export interface OpenRouterOptions {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  title?: string;
  stage?: string;
  onTiming?: (timing: AiPortTiming) => void;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function assertJsonObject(value: unknown): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('OpenRouter response was not a JSON object.');
  }
}

function numericUsage(payload: Record<string, unknown>, key: string): number | undefined {
  const usage = payload.usage;
  if (!usage || typeof usage !== 'object' || Array.isArray(usage)) return undefined;
  const value = (usage as Record<string, unknown>)[key];
  return typeof value === 'number' ? value : undefined;
}

function numericCompletionTokenDetail(payload: Record<string, unknown>, key: string): number | undefined {
  const usage = payload.usage;
  if (!usage || typeof usage !== 'object' || Array.isArray(usage)) return undefined;
  const details = (usage as Record<string, unknown>).completion_tokens_details;
  if (!details || typeof details !== 'object' || Array.isArray(details)) return undefined;
  const value = (details as Record<string, unknown>)[key];
  return typeof value === 'number' ? value : undefined;
}

function stringField(value: Record<string, unknown>, key: string): string | undefined {
  const field = value[key];
  return typeof field === 'string' ? field : undefined;
}

export async function callOpenRouterJson<T>(
  messages: ChatMessage[],
  options: OpenRouterOptions,
): Promise<T> {
  const requestBody = JSON.stringify({
    model: options.model,
    messages,
    temperature: options.temperature ?? 0.1,
    max_tokens: options.maxTokens ?? 12000,
    response_format: { type: 'json_object' },
  });
  const startedAt = Date.now();
  let fetchMs = 0;
  let responseParseMs: number | undefined;
  let contentParseMs: number | undefined;
  let responseChars: number | undefined;
  let contentChars: number | undefined;
  let payload: Record<string, unknown> | undefined;

  try {
    const fetchStartedAt = Date.now();
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
        'X-Title': options.title ?? 'erAV training ai-port',
      },
      body: requestBody,
    });
    const rawResponse = await response.text();
    fetchMs = Date.now() - fetchStartedAt;
    responseChars = rawResponse.length;

    if (!response.ok) {
      throw new Error(`OpenRouter request failed: ${response.status} ${response.statusText}\n${rawResponse}`);
    }

    const responseParseStartedAt = Date.now();
    const parsedPayload = JSON.parse(rawResponse);
    responseParseMs = Date.now() - responseParseStartedAt;
    assertJsonObject(parsedPayload);
    payload = parsedPayload;

    const choices = payload.choices;
    if (!Array.isArray(choices) || choices.length === 0) {
      throw new Error('OpenRouter response did not include choices.');
    }

    const firstChoice = choices[0];
    assertJsonObject(firstChoice);
    const finishReason = stringField(firstChoice, 'finish_reason');
    const nativeFinishReason = stringField(firstChoice, 'native_finish_reason');
    const message = firstChoice.message;
    assertJsonObject(message);
    const content = message.content;
    if (typeof content !== 'string') {
      throw new Error('OpenRouter response content was not a string.');
    }
    contentChars = content.length;

    const contentParseStartedAt = Date.now();
    const parsedContent = parseJsonObject<T>(content);
    contentParseMs = Date.now() - contentParseStartedAt;
    options.onTiming?.({
      stage: options.stage ?? 'openrouter',
      title: options.title,
      model: options.model,
      ok: true,
      requestChars: requestBody.length,
      responseChars,
      contentChars,
      fetchMs,
      responseParseMs,
      contentParseMs,
      totalMs: Date.now() - startedAt,
      finishReason,
      nativeFinishReason,
      promptTokens: numericUsage(payload, 'prompt_tokens'),
      completionTokens: numericUsage(payload, 'completion_tokens'),
      reasoningTokens: numericCompletionTokenDetail(payload, 'reasoning_tokens'),
      totalTokens: numericUsage(payload, 'total_tokens'),
    });
    return parsedContent;
  } catch (error) {
    options.onTiming?.({
      stage: options.stage ?? 'openrouter',
      title: options.title,
      model: options.model,
      ok: false,
      requestChars: requestBody.length,
      responseChars,
      contentChars,
      fetchMs,
      responseParseMs,
      contentParseMs,
      totalMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
      promptTokens: payload ? numericUsage(payload, 'prompt_tokens') : undefined,
      completionTokens: payload ? numericUsage(payload, 'completion_tokens') : undefined,
      totalTokens: payload ? numericUsage(payload, 'total_tokens') : undefined,
    });
    throw error;
  }
}

export function parseJsonObject<T>(raw: string): T {
  const trimmed = raw.trim();
  const withoutFence = trimmed
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '');

  try {
    return JSON.parse(withoutFence) as T;
  } catch {
    const start = withoutFence.indexOf('{');
    const end = withoutFence.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(withoutFence.slice(start, end + 1)) as T;
    }
    throw new Error('Model output was not parseable JSON.');
  }
}
