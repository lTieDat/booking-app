import { api } from '@booking/shared';
import { defaultBookingSearch, normalizeBookingSearch } from '@booking/shared';
import type { BookingSearch, Hotel } from '@booking/shared';

export interface SelectedRoomRequestBody {
  roomId: string;
  quantity: number;
}

export interface CreateDraftBookingRequestBody {
  hotelId: string;
  booking: BookingSearch;
  selectedRooms: SelectedRoomRequestBody[];
}

export interface CreateDraftBookingResponseBody {
  bookingId?: string;
}

export function validateHotelDetailSearch(search: Record<string, unknown>): BookingSearch {
  return normalizeBookingSearch(search, defaultBookingSearch);
}

export function getHotelDetailQuery(hotelId: string, search: BookingSearch) {
  return api.hotel.detail(hotelId, search);
}

export function getCreateDraftBookingMutation() {
  return api.hotel.createDraftBooking();
}
