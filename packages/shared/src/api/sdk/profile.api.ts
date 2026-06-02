import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type { UserProfile } from '../../types/domain';
import type { SpringApiClient } from '../spring-client';
import { syncSpringAuth } from '../spring-client';
import { mapUserSummaryToProfile, springData } from '../mappers';

// ---- Inlined from features/profile ----
export type ProfileUpdateDto = UserProfile;

export interface ProfileUpdateResponseBody {
  message?: string;
  user?: UserProfile;
}
// ----------------------------------------

export class ProfileApi {
  constructor(private readonly client: SpringApiClient) {}

  me() {
    return queryOptions({
      queryKey: ['profile', 'me'],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        return mapUserSummaryToProfile(springData(await this.client.api.getCurrentUser({ signal })));
      },
    });
  }

  update() {
    return mutationOptions({
      mutationKey: ['profile', 'update'],
      mutationFn: async (payload: ProfileUpdateDto) => {
        return {
          success: true,
          data: {
            message: 'Profile updates are not exposed by the Spring Boot API yet.',
            user: payload,
          },
        };
      },
    });
  }
}
