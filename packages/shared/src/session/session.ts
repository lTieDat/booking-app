import Cookies from 'js-cookie';

export type SessionRole = 'user' | 'manager';

export interface AppSession {
  role: SessionRole;
  token: string;
  profile: Record<string, unknown>;
  createdAt: string;
}

const SESSION_STORAGE_KEY = 'booking.session.v1';
const SESSION_EVENT = 'booking-session-change';

function emitSessionChange() {
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function getStoredSession(): AppSession | null {
  if (typeof window === 'undefined') return null;

  const rawValue = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as AppSession;
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function setStoredSession(session: AppSession) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

  if (session.role === 'manager') {
    Cookies.set('managerToken', session.token, { expires: 30 });
  } else {
    Cookies.set('token', session.token, { expires: 30 });
  }

  emitSessionChange();
}

export function clearStoredSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
  Cookies.remove('token');
  Cookies.remove('managerToken');
  emitSessionChange();
}

export function subscribeToSessionChange(callback: () => void) {
  const handler = () => callback();

  window.addEventListener(SESSION_EVENT, handler);
  window.addEventListener('storage', handler);

  return () => {
    window.removeEventListener(SESSION_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
