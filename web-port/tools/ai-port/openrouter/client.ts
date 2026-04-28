export interface OpenRouterOptions {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  title?: string;
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

export async function callOpenRouterJson<T>(
  messages: ChatMessage[],
  options: OpenRouterOptions,
): Promise<T> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      'Content-Type': 'application/json',
      'X-Title': options.title ?? 'erAV training ai-port',
    },
    body: JSON.stringify({
      model: options.model,
      messages,
      temperature: options.temperature ?? 0.1,
      max_tokens: options.maxTokens ?? 12000,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter request failed: ${response.status} ${response.statusText}\n${text}`);
  }

  const payload = await response.json();
  assertJsonObject(payload);
  const choices = payload.choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new Error('OpenRouter response did not include choices.');
  }

  const firstChoice = choices[0];
  assertJsonObject(firstChoice);
  const message = firstChoice.message;
  assertJsonObject(message);
  const content = message.content;
  if (typeof content !== 'string') {
    throw new Error('OpenRouter response content was not a string.');
  }

  return parseJsonObject<T>(content);
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
