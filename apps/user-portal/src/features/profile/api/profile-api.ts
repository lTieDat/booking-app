import { api } from '@booking/shared';
import type { UserProfile } from '@booking/shared';
import type { ProfileUpdateDto } from '../dto/profile-form.dto';

export interface ProfileUpdateResponseBody {
  message?: string;
  user?: UserProfile;
}

export function getProfileQuery() {
  return api.profile.me();
}

export function getUpdateProfileMutation() {
  return api.profile.update();
}
