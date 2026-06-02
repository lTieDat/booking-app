export const SPRING_API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
export const LEGACY_SEARCH_API_BASE_URL =
  import.meta.env.VITE_SEARCH_API_BASE_URL ?? import.meta.env.VITE_LEGACY_API_BASE_URL ?? 'http://localhost:3002/api/v1';

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

export function createUrl(path: string, query?: QueryParams, baseUrl = SPRING_API_BASE_URL) {
  const url = new URL(`${baseUrl}${path}`);

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
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? String((payload as { message?: unknown }).message)
        : typeof payload === 'string' && payload.trim()
          ? payload
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, payload);
  }

  return (payload ?? null) as T;
}

export async function requestJson<T>(
  path: string,
  init?: RequestInit,
  query?: QueryParams,
  baseUrl = SPRING_API_BASE_URL
) {
  const response = await fetch(createUrl(path, query, baseUrl), {
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

interface ClientRequestOptions {
  query?: QueryParams;
  signal?: AbortSignal;
  headers?: HeadersInit;
  body?: string | FormData;
  method?: string;
  baseUrl?: string;
}

export class HttpClient {
  constructor(private readonly baseUrl = SPRING_API_BASE_URL) {}

  request<T>(path: string, options?: ClientRequestOptions) {
    return requestJson<T>(
      path,
      {
        method: options?.method ?? 'GET',
        signal: options?.signal,
        headers: options?.headers,
        body: options?.body,
      },
      options?.query,
      options?.baseUrl ?? this.baseUrl
    );
  }

  get<T>(path: string, options?: Omit<ClientRequestOptions, 'body' | 'method'>) {
    return this.request<T>(path, {
      ...options,
      method: 'GET',
    });
  }

  post<T>(path: string, body?: unknown, options?: Omit<ClientRequestOptions, 'body' | 'method'>) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body instanceof FormData || typeof body === 'string' ? body : body === undefined ? undefined : JSON.stringify(body),
    });
  }
}
