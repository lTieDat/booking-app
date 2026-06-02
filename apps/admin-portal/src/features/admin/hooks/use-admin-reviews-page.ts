import { useDeferredValue, useMemo, useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { queryClient } from '@booking/shared';
import { getAdminReviewsQuery, getHideReviewMutation } from '../api/manage-properties-api';

type ReviewFilter = 'all' | 'reviewed' | 'awaiting' | 'low-rating';

export interface ReviewListItem {
  id?: string;
  bookingId?: string;
  hotelId?: string;
  hotelName?: string;
  hotelNameResolved: string;
  customerName?: string;
  customerEmail?: string;
  status?: string;
  checkInDate?: string;
  checkOutDate?: string;
  hasReview: boolean;
  reviewRating: number | null;
  reviewText: string;
  awaitingReview: boolean;
}

export function useAdminReviewsPage() {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());
  const { data } = useSuspenseQuery(getAdminReviewsQuery());
  const hideReview = useMutation(getHideReviewMutation());

  const items = useMemo(() => {
    const normalized = (data.reviews ?? []).map((review) => {
      const item = {
        ...review,
        hotelNameResolved: review.hotelName ?? review.hotelId ?? 'Unknown property',
        customerName: review.userName,
        status: review.visible === false ? 'hidden' : 'visible',
        hasReview: true,
        reviewRating: typeof review.rating === 'number' ? review.rating : null,
        reviewText: review.comment?.trim() ?? review.title?.trim() ?? '',
        awaitingReview: false,
      } satisfies ReviewListItem;
      return item;
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
        return [item.hotelNameResolved, item.customerName, item.reviewText, item.status]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(deferredSearchTerm);
      });
  }, [data.reviews, deferredSearchTerm, filter]);

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

  const hide = async (reviewId?: string) => {
    if (!reviewId) return;
    try {
      setStatus(null);
      await hideReview.mutateAsync(reviewId);
      await queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
      setStatus('Review hidden.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to hide review');
    }
  };

  return {
    items,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    stats,
    status,
    hide,
  };
}
