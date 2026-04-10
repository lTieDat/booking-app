import { mutationOptions } from '@tanstack/react-query';
import type { ApiEnvelope } from '../contracts';
import { HttpClient } from '../http';
import { unwrapData } from '../unwrap';
import { setStoredSession, type AppSession } from '../../session/session';
import type { ManagerProfile, UserProfile } from '../../types/domain';

// ---- Inlined from features/auth/dto/auth-form.dto ----
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  fullName: string;
}

export interface RegisterResponseBody {
  message?: string;
}

export interface VerifyEmailRequestDto {
  email: string;
  otp: string;
}

export interface VerifyEmailResponseBody {
  message?: string;
  verified?: boolean;
}
// -------------------------------------------------------

interface AuthResponseBody<TProfile> extends ApiEnvelope<TProfile & { token?: string }> {
  token?: string;
}

function persistSessionFromResponse<TProfile extends object>(
  role: 'user' | 'manager',
  response: AuthResponseBody<TProfile>
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

export class AuthApi {
  constructor(private readonly client: HttpClient) {}

  loginUser() {
    return mutationOptions({
      mutationKey: ['auth', 'user', 'login'],
      mutationFn: async (payload: LoginRequestDto) => {
        const response = await this.client.post<AuthResponseBody<UserProfile>>('/users/login', payload);
        return persistSessionFromResponse('user', response);
      },
    });
  }

  loginManager() {
    return mutationOptions({
      mutationKey: ['auth', 'manager', 'login'],
      mutationFn: async (payload: LoginRequestDto) => {
        const response = await this.client.post<AuthResponseBody<ManagerProfile>>('/admin/login', payload);
        return persistSessionFromResponse('manager', response);
      },
    });
  }

  register() {
    return mutationOptions({
      mutationKey: ['auth', 'register'],
      mutationFn: (payload: RegisterRequestDto) =>
        this.client.post<ApiEnvelope<RegisterResponseBody>>('/users/register', payload),
    });
  }

  verifyEmail() {
    return mutationOptions({
      mutationKey: ['auth', 'verify-email'],
      mutationFn: (payload: VerifyEmailRequestDto) =>
        this.client.post<ApiEnvelope<VerifyEmailResponseBody>>('/users/verify', payload),
    });
  }
}
