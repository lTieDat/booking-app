import { useState } from 'react';
import { updateProfile } from '../api/profile-api';
import { toProfileUpdateDto, type ProfileFormValues } from '../dto/profile-form.dto';
import { useProfileForm } from './use-profile-form';
import type { UserProfile } from '../../../shared/types/domain';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to update profile';
}

export function useProfilePage(user: UserProfile) {
  const [status, setStatus] = useState<string | null>(null);
  const form = useProfileForm(user);

  const submit = form.handleSubmit(async (values: ProfileFormValues) => {
    try {
      setStatus(null);
      await updateProfile(toProfileUpdateDto(values));
      setStatus('Profile updated successfully.');
    } catch (error) {
      setStatus(getErrorMessage(error));
    }
  });

  return {
    form,
    status,
    submit,
  };
}
