import { startTransition, useMemo } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { defaultBookingSearch, normalizeBookingSearch } from '../../../shared/lib/booking-search';
import type { BookingSearch } from '../../../shared/types/domain';

export function useBookingSearchQuery() {
  const navigate = useNavigate();
  const rawSearch = useRouterState({
    select: (state) => state.location.search,
  });

  const bookingSearch = useMemo(
    () => normalizeBookingSearch(rawSearch as Record<string, unknown>, defaultBookingSearch),
    [rawSearch]
  );

  const pushSearch = (nextSearch: BookingSearch) => {
    startTransition(() => {
      navigate({
        to: '/searchresult',
        search: normalizeBookingSearch(nextSearch, defaultBookingSearch),
      });
    });
  };

  const openHotelDetail = (hotelId: string) => {
    startTransition(() => {
      navigate({
        to: '/hotelDetail/$hotelId',
        params: { hotelId },
        search: bookingSearch,
      });
    });
  };

  const resetSearch = () => {
    pushSearch(defaultBookingSearch);
  };

  return {
    bookingSearch,
    hasActiveSearch:
      Boolean(bookingSearch.city || bookingSearch.country || bookingSearch.propertyName) &&
      Boolean(bookingSearch.startDate && bookingSearch.endDate),
    pushSearch,
    openHotelDetail,
    resetSearch,
  };
}
