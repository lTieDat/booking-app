import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getCancelBookingMutation, getHideReviewMutation, getSubmitReviewMutation } from '../api/history-api';
import { useReviewForm } from './use-review-form';
import { queryClient } from '@booking/shared';
import type { BookingRecord, Hotel, UserProfile } from '@booking/shared';

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
  const hideReviewMutation = useMutation(getHideReviewMutation());
  const cancelBookingMutation = useMutation(getCancelBookingMutation());

  const closeReview = () => {
    setActiveBooking(null);
    setStatus(null);
  };

  const openReview = (booking: BookingWithHotel) => {
    setActiveBooking(booking);
    setStatus(null);
  };

  const submit = reviewForm.handleSubmit(async (values) => {
    if (!activeBooking?.bookingId) {
      setStatus('Review details are incomplete for this booking.');
      return;
    }

    try {
      setStatus(null);

      await submitReviewMutation.mutateAsync({
        bookingId: activeBooking.bookingId,
        hotelId: activeBooking.hotelId ?? '',
        userId: activeBooking.userId ?? '',
        reviewId: typeof activeBooking.review === 'object' ? activeBooking.review?.id : undefined,
        reviewText: values.reviewText.trim(),
        rating: values.rating,
      });
      await queryClient.invalidateQueries({ queryKey: ['booking', 'history'] });

      setStatus('Review submitted successfully.');
    } catch (error) {
      setStatus(getErrorMessage(error));
    }
  });

  const hideReview = async () => {
    const reviewId = typeof activeBooking?.review === 'object' ? activeBooking.review?.id : undefined;
    if (!reviewId) {
      setStatus('This booking does not have a review to hide.');
      return;
    }
    try {
      setStatus(null);
      await hideReviewMutation.mutateAsync(reviewId);
      await queryClient.invalidateQueries({ queryKey: ['booking', 'history'] });
      closeReview();
    } catch (error) {
      setStatus(getErrorMessage(error));
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await cancelBookingMutation.mutateAsync({
        bookingId,
        reason: 'Cancelled from user portal',
      });
      await queryClient.invalidateQueries({ queryKey: ['booking', 'history'] });
    } catch (error) {
      setStatus(getErrorMessage(error));
    }
  };

  return {
    user,
    items,
    activeBooking,
    status,
    reviewForm,
    openReview,
    closeReview,
    submit,
    hideReview,
    cancelBooking,
  };
}
