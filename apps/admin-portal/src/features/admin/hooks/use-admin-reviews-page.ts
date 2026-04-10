import { useDeferredValue, useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { BookingRecord, Hotel } from '@booking/shared';
import { getManageBookingsQuery } from '../api/manage-bookings-api';
import { getManagePropertiesQuery } from '../api/manage-properties-api';

type ReviewFilter = 'all' | 'reviewed' | 'awaiting' | 'low-rating';

export interface ReviewListItem extends BookingRecord {
  hotelNameResolved: string;
  hotelResolved?: Hotel;
  hasReview: boolean;
  reviewRating: number | null;
  reviewText: string;
  awaitingReview: boolean;
}

function isReviewObject(review: BookingRecord['review']): review is NonNullable<Exclude<BookingRecord['review'], 'no reviews'>> {
  return Boolean(review && typeof review === 'object');
}

function isAwaitingReview(booking: BookingRecord, hasReview: boolean) {
  const status = booking.status?.toLowerCase() ?? '';
  return !hasReview && ['confirmed', 'paid', 'completed'].includes(status);
}

export function useAdminReviewsPage() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());
  const { data: bookingsData } = useSuspenseQuery(getManageBookingsQuery());
  const { data: propertiesData } = useSuspenseQuery(getManagePropertiesQuery());

  const hotelsById = useMemo(
    () =>
      new Map(
        (propertiesData.hotels ?? []).map((hotel) => [hotel.HotelId ?? hotel.id ?? '', hotel] as const)
      ),
    [propertiesData.hotels]
  );

  const items = useMemo(() => {
    const normalized = (bookingsData.bookings ?? []).map((booking) => {
      const hotelResolved = hotelsById.get(booking.hotelId ?? '');
      const review = isReviewObject(booking.review) ? booking.review : null;
      const hasReview = Boolean(review?.reviewText || typeof review?.rating === 'number');

      return {
        ...booking,
        hotelResolved,
        hotelNameResolved: hotelResolved?.HotelName ?? booking.hotelName ?? booking.hotelId ?? 'Unknown property',
        hasReview,
        reviewRating: typeof review?.rating === 'number' ? review.rating : null,
        reviewText: review?.reviewText?.trim() ?? '',
        awaitingReview: isAwaitingReview(booking, hasReview),
      } satisfies ReviewListItem;
    });

    return normalized
      .filter((item) => {
        if (filter === 'reviewed') return item.hasReview;
        if (filter === 'awaiting') return item.awaitingReview;
        if (filter === 'low-rating') return item.hasReview && (item.reviewRating ?? 0) <= 3;
        return true;
      })
      .filter((item) => {
        if (!deferredSearchTerm) return true;

        const haystack = [
          item.hotelNameResolved,
          item.customerName,
          item.customerEmail,
          item.reviewText,
          item.status,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return haystack.includes(deferredSearchTerm);
      })
      .sort((left, right) => {
        const leftDate = new Date(left.checkOutDate ?? left.checkInDate ?? 0).getTime();
        const rightDate = new Date(right.checkOutDate ?? right.checkInDate ?? 0).getTime();
        return rightDate - leftDate;
      });
  }, [bookingsData.bookings, deferredSearchTerm, filter, hotelsById]);

  const stats = useMemo(() => {
    const reviewedItems = items.filter((item) => item.hasReview && item.reviewRating !== null);
    const totalRating = reviewedItems.reduce((sum, item) => sum + (item.reviewRating ?? 0), 0);

    return {
      totalReviews: items.filter((item) => item.hasReview).length,
      lowRatingCount: items.filter((item) => item.hasReview && (item.reviewRating ?? 0) <= 3).length,
      awaitingReviewCount: items.filter((item) => item.awaitingReview).length,
      averageRating: reviewedItems.length ? totalRating / reviewedItems.length : 0,
    };
  }, [items]);

  return {
    items,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    stats,
  };
}
