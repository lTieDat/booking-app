import { mutationOptions } from '@tanstack/react-query';
import { setStoredSession, type AppSession } from '../../session/session';
import type { SpringApiClient } from '../spring-client';
import { syncSpringAuth } from '../spring-client';
import { mapUserSummaryToManagerProfile, mapUserSummaryToProfile, springData } from '../mappers';

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

export interface PasswordResetRequestDto {
  email: string;
}

export interface PasswordResetConfirmDto {
  email: string;
  token: string;
  newPassword: string;
}

function persistSession<TProfile extends object>(role: AppSession['role'], token: string, profile: TProfile) {
  const session: AppSession = {
    role,
    token,
    profile: profile as Record<string, unknown>,
    createdAt: new Date().toISOString(),
  };

  setStoredSession(session);
  return session;
}

export class AuthApi {
  constructor(private readonly client: SpringApiClient) {}

  loginUser() {
    return mutationOptions({
      mutationKey: ['auth', 'user', 'login'],
      mutationFn: async (payload: LoginRequestDto) => {
        const auth = springData(
          await this.client.api.authenticateUser({
            usernameOrEmail: payload.email,
            password: payload.password,
          })
        );
        const token = auth.accessToken;
        if (!token) throw new Error('Authentication token was not returned by the server');

        syncSpringAuth(this.client, token);
        const profile = mapUserSummaryToProfile(springData(await this.client.api.getCurrentUser()), token);
        return persistSession('user', token, profile);
      },
    });
  }

  loginReceptionist() {
    return mutationOptions({
      mutationKey: ['auth', 'receptionist', 'login'],
      mutationFn: async (payload: LoginRequestDto) => {
        const auth = springData(
          await this.client.api.authenticateUser({
            usernameOrEmail: payload.email,
            password: payload.password,
          })
        );
        const token = auth.accessToken;
        if (!token) throw new Error('Authentication token was not returned by the server');

        syncSpringAuth(this.client, token);
        const profile = mapUserSummaryToManagerProfile(springData(await this.client.api.getCurrentUser()), token);
        return persistSession('receptionist', token, profile);
      },
    });
  }

  loginManager() {
    return mutationOptions({
      mutationKey: ['auth', 'manager', 'login'],
      mutationFn: async (payload: LoginRequestDto) => {
        const auth = springData(
          await this.client.api.authenticateManager({
            usernameOrEmail: payload.email,
            password: payload.password,
          })
        );
        const token = auth.accessToken;
        if (!token) throw new Error('Authentication token was not returned by the server');

        syncSpringAuth(this.client, token);
        const profile = mapUserSummaryToManagerProfile(springData(await this.client.api.getCurrentUser()), token);
        return persistSession('manager', token, profile);
      },
    });
  }

  register() {
    return mutationOptions({
      mutationKey: ['auth', 'register'],
      mutationFn: async (payload: RegisterRequestDto) => {
        const username = payload.email
          .split('@')[0]
          .replace(/[^a-zA-Z0-9]/g, '')
          .slice(0, 15)
          .padEnd(3, '0');
        const response = springData(
          await this.client.api.registerUser({
            name: payload.fullName,
            username,
            email: payload.email,
            password: payload.password,
          })
        );
        await this.client.api.requestEmailVerification({ email: payload.email });
        return response;
      },
    });
  }

  verifyEmail() {
    return mutationOptions({
      mutationKey: ['auth', 'verify-email'],
      mutationFn: async (payload: VerifyEmailRequestDto) =>
        springData(
          await this.client.api.verifyEmail({
            email: payload.email,
            token: payload.otp,
          })
        ),
    });
  }

  requestPasswordReset() {
    return mutationOptions({
      mutationKey: ['auth', 'password-reset', 'request'],
      mutationFn: async (payload: PasswordResetRequestDto) =>
        springData(await this.client.api.requestPasswordReset({ email: payload.email })),
    });
  }

  resetPassword() {
    return mutationOptions({
      mutationKey: ['auth', 'password-reset', 'confirm'],
      mutationFn: async (payload: PasswordResetConfirmDto) =>
        springData(
          await this.client.api.resetPassword({
            email: payload.email,
            token: payload.token,
            newPassword: payload.newPassword,
          })
        ),
    });
  }
}
