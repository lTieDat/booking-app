import { z } from 'zod';
import type { BookingSearch } from '@booking/shared';

const requiredDateSchema = z.string().min(1, 'This date is required').refine((value) => !Number.isNaN(new Date(value).getTime()), {
  message: 'Enter a valid date',
});

export const bookingSearchSchema = z
  .object({
    city: z.string().trim().min(1, 'City is required'),
    country: z.string().trim().min(1, 'Country is required'),
    startDate: requiredDateSchema,
    endDate: requiredDateSchema,
    adults: z.number().int().min(1, 'At least one adult is required'),
    children: z.number().int().min(0, 'Children cannot be negative'),
    rooms: z.number().int().min(1, 'Select at least one room'),
    lat: z.string().trim().min(1, 'Select a destination suggestion'),
    lng: z.string().trim().min(1, 'Select a destination suggestion'),
    propertyName: z.string(),
    roomTags: z.string(),
  })
  .refine((values) => new Date(values.endDate) >= new Date(values.startDate), {
    path: ['endDate'],
    message: 'Check-out must be on or after check-in',
  });

export type SearchFormValues = z.infer<typeof bookingSearchSchema>;

export function createSearchFormDefaults(initialValues?: Partial<BookingSearch>): SearchFormValues {
  return {
    city: initialValues?.city ?? '',
    country: initialValues?.country ?? '',
    startDate: initialValues?.startDate ?? '',
    endDate: initialValues?.endDate ?? '',
    adults: initialValues?.adults ?? 2,
    children: initialValues?.children ?? 0,
    rooms: initialValues?.rooms ?? 1,
    lat: initialValues?.lat ?? '',
    lng: initialValues?.lng ?? '',
    propertyName: initialValues?.propertyName ?? '',
    roomTags: initialValues?.roomTags ?? '',
  };
}
