import { getStoredSession } from '../session/session';
import { Api as BookingRestApi, type RequestParams } from './generated/booking-api';
import { SPRING_API_BASE_URL } from './http';

export type SpringApiClient = BookingRestApi<string>;

export function createSpringApiClient() {
  return new BookingRestApi<string>({
    baseUrl: SPRING_API_BASE_URL,
    baseApiParams: {
      format: 'json',
    },
    securityWorker: (token) =>
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : undefined,
  });
}

export function syncSpringAuth(client: SpringApiClient, token = getStoredSession()?.token ?? null) {
  client.setSecurityData(token);
  return client;
}

export function withSignal(signal?: AbortSignal): RequestParams {
  return signal ? { signal } : {};
}
