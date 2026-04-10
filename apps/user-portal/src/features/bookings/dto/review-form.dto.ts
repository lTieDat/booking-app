import { z } from 'zod';

export const reviewFormSchema = z.object({
  rating: z.number().int().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  reviewText: z
    .string()
    .trim()
    .min(20, 'Share at least 20 characters so the review is useful')
    .max(1000, 'Keep the review under 1000 characters'),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export function createReviewFormDefaults(): ReviewFormValues {
  return {
    rating: 5,
    reviewText: '',
  };
}
