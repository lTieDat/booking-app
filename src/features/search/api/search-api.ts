import { getJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import type { BookingSearch, Hotel } from '../../../shared/types/domain';

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

export function validateSearchParams(search: Record<string, unknown>): BookingSearch {
  return {
    city: String(search.city ?? defaultBookingSearch.city),
    country: String(search.country ?? defaultBookingSearch.country),
    startDate: String(search.startDate ?? defaultBookingSearch.startDate),
    endDate: String(search.endDate ?? defaultBookingSearch.endDate),
    adults: Number(search.adults ?? defaultBookingSearch.adults) || defaultBookingSearch.adults,
    children: Number(search.children ?? defaultBookingSearch.children) || defaultBookingSearch.children,
    rooms: Number(search.rooms ?? defaultBookingSearch.rooms) || defaultBookingSearch.rooms,
    lat: String(search.lat ?? defaultBookingSearch.lat),
    lng: String(search.lng ?? defaultBookingSearch.lng),
    propertyName: String(search.propertyName ?? defaultBookingSearch.propertyName),
    roomTags: String(search.roomTags ?? defaultBookingSearch.roomTags),
  };
}

export async function loadSearchResults(search: BookingSearch) {
  if (!search.city && !search.country) {
    return {
      hotels: [] as Hotel[],
      search,
    };
  }

  const response = await getJson('/hotel/search', { ...search });
  const hotels = unwrapData<Hotel[]>(response) ?? [];

  return {
    hotels,
    search,
  };
}
