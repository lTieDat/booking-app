import { postJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import { setStoredSession, type AppSession } from '../../../shared/session/session';
import type { ManagerProfile, UserProfile } from '../../../shared/types/domain';
import type { LoginRequestDto, RegisterRequestDto } from '../dto/auth-form.dto';

interface AuthResponse<TProfile> {
  status?: number;
  data?: TProfile & { token?: string };
  token?: string;
}

function persistSessionFromResponse<TProfile extends object>(
  role: 'user' | 'manager',
  response: AuthResponse<TProfile>
) {
  const profile = unwrapData<TProfile & { token?: string }>(response);
  const token = response.token ?? profile.token;

  if (!token) {
    throw new Error('Authentication token was not returned by the server');
  }

  const session: AppSession = {
    role,
    token,
    profile,
    createdAt: new Date().toISOString(),
  };

  setStoredSession(session);
  return session;
}

export async function loginUser(payload: LoginRequestDto) {
  const response = await postJson<AuthResponse<UserProfile>>('/users/login', payload);
  return persistSessionFromResponse('user', response);
}

export async function loginManager(payload: LoginRequestDto) {
  const response = await postJson<AuthResponse<ManagerProfile>>('/admin/login', payload);
  return persistSessionFromResponse('manager', response);
}

export function registerUser(payload: RegisterRequestDto) {
  return postJson('/users/register', payload);
}

export function verifyEmail(email: string, code: string) {
  return postJson('/users/verify', {
    otp: code,
    email,
  });
}
