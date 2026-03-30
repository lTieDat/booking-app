import { api } from '../../../shared/api';
import { defaultBookingSearch, normalizeBookingSearch } from '../../../shared/lib/booking-search';
import type { BookingSearch, Hotel } from '../../../shared/types/domain';

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
