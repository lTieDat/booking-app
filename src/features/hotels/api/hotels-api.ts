import { getJson, postJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import type { BookingSearch, Hotel } from '../../../shared/types/domain';

export function validateHotelDetailSearch(search: Record<string, unknown>): BookingSearch {
  return {
    city: String(search.city ?? ''),
    country: String(search.country ?? ''),
    startDate: String(search.startDate ?? ''),
    endDate: String(search.endDate ?? ''),
    adults: Number(search.adults ?? 2) || 2,
    children: Number(search.children ?? 0) || 0,
    rooms: Number(search.rooms ?? 1) || 1,
    lat: String(search.lat ?? ''),
    lng: String(search.lng ?? ''),
    propertyName: String(search.propertyName ?? ''),
    roomTags: String(search.roomTags ?? ''),
  };
}

export async function loadHotelDetail(hotelId: string, search: BookingSearch) {
  const response = await getJson(`/hotel/${hotelId}`, { ...search });
  const hotel = unwrapData<Hotel>(response);

  return {
    hotel,
    bookingSearch: search,
  };
}

export async function createDraftBooking(hotelId: string, bookingSearch: BookingSearch, selectedRooms: Array<{ roomId: string; quantity: number }>) {
  const response = await postJson('/booking/create', {
    hotelId,
    booking: bookingSearch,
    selectedRooms,
  });

  const payload = unwrapData<string | { bookingId?: string }>(response);

  if (typeof payload === 'string') {
    return payload;
  }

  if (payload.bookingId) {
    return payload.bookingId;
  }

  throw new Error('Booking id was not returned by the server');
}
