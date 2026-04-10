import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createReviewFormDefaults, reviewFormSchema, type ReviewFormValues } from '../dto/review-form.dto';
import type { BookingRecord } from '@booking/shared';

export function useReviewForm(activeBooking: BookingRecord | null) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: createReviewFormDefaults(),
  });

  useEffect(() => {
    form.reset(createReviewFormDefaults());
  }, [activeBooking, form]);

  return form;
}
