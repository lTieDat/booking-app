import type { ApiEnvelope } from './contracts';

export function unwrapData<T>(response: unknown): T {
  if (typeof response === 'object' && response && 'data' in response) {
    return (response as ApiEnvelope<T>).data as T;
  }

  return response as T;
}

export function unwrapStatus(response: unknown) {
  if (typeof response === 'object' && response && 'status' in response) {
    return Number((response as { status?: unknown }).status) || 200;
  }

  return 200;
}
