import { redirect } from '@tanstack/react-router';
import { getStoredSession, type SessionRole } from '../session/session';

export function requireSession(role?: SessionRole) {
  const session = getStoredSession();

  if (!session) {
    throw redirect({ to: role === 'manager' ? '/loginManager' : '/login' });
  }

  if (role && session.role !== role) {
    throw redirect({
      to: session.role === 'manager' ? '/admin/managePage/dashboard' : '/',
    });
  }

  return session;
}
