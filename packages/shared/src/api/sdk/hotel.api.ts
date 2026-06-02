import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type { BookingSearch, Hotel } from '../../types/domain';
import type { SpringApiClient } from '../spring-client';
import { syncSpringAuth } from '../spring-client';
import { mapHotelResponseToHotel, mapRoomTypeToHotelRoom, springData } from '../mappers';

// ---- Inlined from features/hotels/api/hotels-api ----
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
  message?: string;
}
// ------------------------------------------------------

const CHECKOUT_DRAFT_KEY = 'booking.checkoutDraft.v1.';

export interface CheckoutDraft {
  id: string;
  hotelId: string;
  booking: BookingSearch;
  selectedRooms: SelectedRoomRequestBody[];
  createdAt: string;
}

export function readCheckoutDraft(id: string): CheckoutDraft | null {
  if (typeof window === 'undefined') return null;
  const raw = window.sessionStorage.getItem(`${CHECKOUT_DRAFT_KEY}${id}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CheckoutDraft;
  } catch {
    window.sessionStorage.removeItem(`${CHECKOUT_DRAFT_KEY}${id}`);
    return null;
  }
}

export function writeCheckoutDraft(draft: CheckoutDraft) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(`${CHECKOUT_DRAFT_KEY}${draft.id}`, JSON.stringify(draft));
}

export class HotelApi {
  constructor(private readonly client: SpringApiClient) {}

  detail(hotelId: string, search: BookingSearch) {
    return queryOptions({
      queryKey: ['hotel', 'detail', hotelId, search],
      queryFn: async ({ signal }) => {
        const [hotelResponse, roomTypesResponse] = await Promise.all([
          this.client.api.getHotel(hotelId, { signal }),
          this.client.api.getRoomTypes(hotelId, { signal }),
        ]);
        const rooms = springData(roomTypesResponse).map(mapRoomTypeToHotelRoom);
        return mapHotelResponseToHotel(springData(hotelResponse), rooms);
      },
    });
  }

  createDraftBooking() {
    return mutationOptions({
      mutationKey: ['booking', 'draft', 'create'],
      mutationFn: async (payload: CreateDraftBookingRequestBody) => {
        syncSpringAuth(this.client);
        const id = crypto.randomUUID();
        writeCheckoutDraft({
          id,
          hotelId: payload.hotelId,
          booking: payload.booking,
          selectedRooms: payload.selectedRooms,
          createdAt: new Date().toISOString(),
        });
        return id;
      },
    });
  }
}
