import type { BookingSearch } from '../types/domain';

export const defaultBookingSearch: BookingSearch = {
  city: '',
  country: '',
  startDate: '',
  endDate: '',
  adults: 2,
  children: 0,
  rooms: 1,
  lat: '',
  lng: '',
  propertyName: '',
  roomTags: '',
};

function parseInteger(value: unknown, fallback: number, minimum: number) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.max(minimum, Math.trunc(parsed));
}

export function normalizeBookingSearch(
  search: Partial<BookingSearch> | Record<string, unknown>,
  fallback: BookingSearch = defaultBookingSearch
): BookingSearch {
  return {
    city: String(search.city ?? fallback.city),
    country: String(search.country ?? fallback.country),
    startDate: String(search.startDate ?? fallback.startDate),
    endDate: String(search.endDate ?? fallback.endDate),
    adults: parseInteger(search.adults, fallback.adults, 1),
    children: parseInteger(search.children, fallback.children, 0),
    rooms: parseInteger(search.rooms, fallback.rooms, 1),
    lat: String(search.lat ?? fallback.lat ?? ''),
    lng: String(search.lng ?? fallback.lng ?? ''),
    propertyName: String(search.propertyName ?? fallback.propertyName ?? ''),
    roomTags: String(search.roomTags ?? fallback.roomTags ?? ''),
  };
}
