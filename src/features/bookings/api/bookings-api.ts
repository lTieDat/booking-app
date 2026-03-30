import { getJson, postJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import type { BookingRecord, Hotel, HotelRoom, PrefixOption } from '../../../shared/types/domain';
import type { UpdateBookingRequestDto } from '../dto/checkout-form.dto';

interface CheckoutLoaderData {
  booking: BookingRecord & { hotelId?: string };
  hotel: Hotel;
  rooms: HotelRoom[];
  prefixes: PrefixOption[];
}

export async function loadCheckoutPage(bookingId: string): Promise<CheckoutLoaderData> {
  const bookingResponse = await getJson(`/booking/${bookingId}`);
  const booking = unwrapData<BookingRecord & { hotelId?: string }>(bookingResponse);

  const roomIds = booking.rooms?.map((room) => room.roomId) ?? [];

  const [prefixResponse, hotelResponse, roomResponses] = await Promise.all([
    getJson('/users/prefix'),
    getJson(`/hotel/${booking.hotelId}`),
    Promise.all(roomIds.map((roomId) => getJson(`/hotel/rooms/${roomId}`))),
  ]);

  return {
    booking,
    hotel: unwrapData<Hotel>(hotelResponse),
    prefixes: unwrapData<PrefixOption[]>(prefixResponse) ?? [],
    rooms: roomResponses.map((roomResponse) => unwrapData<HotelRoom>(roomResponse)),
  };
}

export async function updateBooking(bookingId: string, payload: UpdateBookingRequestDto) {
  return postJson(`/booking/${bookingId}/update`, payload);
}
