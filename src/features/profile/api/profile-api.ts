import { api } from '../../../shared/api';
import type { UserProfile } from '../../../shared/types/domain';
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
