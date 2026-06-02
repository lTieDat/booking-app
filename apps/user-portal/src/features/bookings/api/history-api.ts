import { api } from '@booking/shared';
import type { BookingRecord } from '@booking/shared';

export interface ReviewRequestBody {
  bookingId: string;
  hotelId: string;
  userId: string;
  reviewText: string;
  rating: number;
}

export interface ReviewResponseBody {
  message?: string;
  review?: BookingRecord['review'];
}

export function getBookingHistoryQuery() {
  return api.booking.history();
}

export function getSubmitReviewMutation() {
  return api.booking.submitReview();
}

export function getHideReviewMutation() {
  return api.booking.hideReview();
}

export function getCancelBookingMutation() {
  return api.booking.cancel();
}
