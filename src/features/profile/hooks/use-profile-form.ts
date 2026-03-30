import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { createProfileFormDefaults, profileFormSchema, type ProfileFormValues } from '../dto/profile-form.dto';
import type { UserProfile } from '../../../shared/types/domain';

export function useProfileForm(defaultValues: UserProfile) {
  const initialValues = useMemo(() => createProfileFormDefaults(defaultValues), [defaultValues]);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  return form;
}
