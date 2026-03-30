import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getSubmitReviewMutation } from '../api/history-api';
import { useReviewForm } from './use-review-form';
import { queryClient } from '../../../shared/query/query-client';
import type { BookingRecord, Hotel, UserProfile } from '../../../shared/types/domain';

export interface BookingWithHotel extends BookingRecord {
  hotel: Hotel;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to submit review';
}

export function useBookingHistoryPage(user: UserProfile, bookings: BookingWithHotel[]) {
  const items = useMemo(() => bookings ?? [], [bookings]);
  const [activeBooking, setActiveBooking] = useState<BookingWithHotel | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const reviewForm = useReviewForm(activeBooking);
  const submitReviewMutation = useMutation(getSubmitReviewMutation());

  const closeReview = () => {
    setActiveBooking(null);
    setStatus(null);
  };

  const openReview = (booking: BookingWithHotel) => {
    setActiveBooking(booking);
    setStatus(null);
  };

  const submit = reviewForm.handleSubmit(async (values) => {
    if (!activeBooking?.bookingId || !activeBooking.hotelId || !activeBooking.userId) {
      setStatus('Review details are incomplete for this booking.');
      return;
    }

    try {
      setStatus(null);

      await submitReviewMutation.mutateAsync({
        bookingId: activeBooking.bookingId,
        hotelId: activeBooking.hotelId,
        userId: activeBooking.userId,
        reviewText: values.reviewText.trim(),
        rating: values.rating,
      });
      await queryClient.invalidateQueries({ queryKey: ['booking', 'history'] });

      setStatus('Review submitted successfully.');
    } catch (error) {
      setStatus(getErrorMessage(error));
    }
  });

  return {
    user,
    items,
    activeBooking,
    status,
    reviewForm,
    openReview,
    closeReview,
    submit,
  };
}
