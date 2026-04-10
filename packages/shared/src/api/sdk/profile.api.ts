import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type { ApiEnvelope, ApiResponse } from '../contracts';
import { HttpClient } from '../http';
import { unwrapData } from '../unwrap';
import { requireSession } from '../../routes/guards';
import type { UserProfile } from '../../types/domain';

// ---- Inlined from features/profile ----
export type ProfileUpdateDto = UserProfile;

export interface ProfileUpdateResponseBody {
  message?: string;
  user?: UserProfile;
}
// ----------------------------------------

export class ProfileApi {
  constructor(private readonly client: HttpClient) {}

  me() {
    return queryOptions({
      queryKey: ['profile', 'me'],
      queryFn: async ({ signal }) => {
        const session = requireSession('user');
        const response = await this.client.get<ApiResponse<UserProfile>>('/users/me', {
          signal,
          query: { tokenID: session.token },
        });

        return unwrapData<UserProfile>(response);
      },
    });
  }

  update() {
    return mutationOptions({
      mutationKey: ['profile', 'update'],
      mutationFn: async (payload: ProfileUpdateDto) => {
        const session = requireSession('user');

        return this.client.request<ApiEnvelope<ProfileUpdateResponseBody>>('/users/updateUser', {
          method: 'POST',
          body: JSON.stringify(payload),
          query: { tokenID: session.token },
        });
      },
    });
  }
}
