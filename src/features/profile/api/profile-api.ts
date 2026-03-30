import { getJson, requestJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import { requireSession } from '../../../shared/routes/guards';
import type { UserProfile } from '../../../shared/types/domain';
import type { ProfileUpdateDto } from '../dto/profile-form.dto';

export async function loadProfilePage() {
  const session = requireSession('user');
  const response = await getJson('/users/me', {
    tokenID: session.token,
  });

  return {
    user: unwrapData<UserProfile>(response),
  };
}

export function updateProfile(payload: ProfileUpdateDto) {
  const session = requireSession('user');

  return requestJson('/users/updateUser', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, {
    tokenID: session.token,
  });
}
