import { api } from '../../../shared/api';
import { defaultBookingSearch, normalizeBookingSearch } from '../../../shared/lib/booking-search';
import type { BookingSearch, Hotel } from '../../../shared/types/domain';

export function validateSearchParams(search: Record<string, unknown>): BookingSearch {
  return normalizeBookingSearch(search, defaultBookingSearch);
}

export function getSearchResultsQuery(search: BookingSearch) {
  return api.search.results(search);
}
