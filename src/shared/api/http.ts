const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3002/api/v1';

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined | Array<string | number | boolean>
>;

export function createUrl(path: string, query?: QueryParams) {
  const url = new URL(`${API_BASE_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;

      if (Array.isArray(value)) {
        value.forEach((entry) => url.searchParams.append(key, String(entry)));
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? String((payload as { message?: unknown }).message)
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export async function requestJson<T>(path: string, init?: RequestInit, query?: QueryParams) {
  const response = await fetch(createUrl(path, query), {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers ?? {}),
    },
  });

  return parseResponse<T>(response);
}

export function getJson<T>(path: string, query?: QueryParams) {
  return requestJson<T>(path, { method: 'GET' }, query);
}

export function postJson<T>(path: string, body?: unknown) {
  return requestJson<T>(path, {
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
