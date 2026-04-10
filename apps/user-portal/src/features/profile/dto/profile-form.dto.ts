import { z } from 'zod';
import type { UserProfile } from '@booking/shared';

export const profileFormSchema = z.object({
  _id: z.string().optional(),
  token: z.string().optional(),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  userName: z.string().trim().min(1, 'Display name is required'),
  fullName: z.string().trim().min(1, 'Full name is required'),
  phone: z.string().trim().refine((value) => value === '' || /^[0-9+\s()-]{7,}$/.test(value), {
    message: 'Enter a valid phone number',
  }),
  address: z.string().trim(),
  dateOfBirth: z.string().refine((value) => value === '' || !Number.isNaN(new Date(value).getTime()), {
    message: 'Enter a valid date',
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type ProfileUpdateDto = UserProfile;

export function createProfileFormDefaults(profile: UserProfile): ProfileFormValues {
  return {
    _id: profile._id,
    token: profile.token,
    email: profile.email ?? '',
    userName: profile.userName ?? '',
    fullName: profile.fullName ?? '',
    phone: profile.phone ?? '',
    address: profile.address ?? '',
    dateOfBirth: profile.dateOfBirth ?? '',
  };
}

export function toProfileUpdateDto(values: ProfileFormValues): ProfileUpdateDto {
  return {
    _id: values._id,
    token: values.token,
    email: values.email,
    userName: values.userName,
    fullName: values.fullName,
    phone: values.phone,
    address: values.address,
    dateOfBirth: values.dateOfBirth,
  };
}
