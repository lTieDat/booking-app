import { api } from '@booking/shared';
import { defaultBookingSearch, normalizeBookingSearch } from '@booking/shared';
import type { BookingSearch, Hotel } from '@booking/shared';

export function validateSearchParams(search: Record<string, unknown>): BookingSearch {
  return normalizeBookingSearch(search, defaultBookingSearch);
}

export function getSearchResultsQuery(search: BookingSearch) {
  return api.search.results(search);
}
