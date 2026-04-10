import { useSyncExternalStore } from 'react';
import { getStoredSession, subscribeToSessionChange } from './session';

export function useSession() {
  return useSyncExternalStore(subscribeToSessionChange, getStoredSession, () => null);
}
