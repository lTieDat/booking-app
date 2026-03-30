import { getJson, postJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import { requireSession } from '../../../shared/routes/guards';
import type { BookingRecord, Hotel, UserProfile } from '../../../shared/types/domain';

export async function loadBookingHistoryPage() {
  const session = requireSession('user');
  const userResponse = await getJson('/users/me', {
    tokenID: session.token,
  });
  const user = unwrapData<UserProfile>(userResponse);

  const bookingsResponse = await getJson(`/booking/bookingHistory/${user.email}`);
  const bookings = unwrapData<BookingRecord[]>(bookingsResponse) ?? [];

  const hotels = await Promise.all(bookings.map((booking) => getJson(`/hotel/${booking.hotelId}`)));

  return {
    user,
    bookings: bookings.map((booking, index) => ({
      ...booking,
      hotel: unwrapData<Hotel>(hotels[index]),
    })),
  };
}

export function submitReview(payload: {
  bookingId: string;
  hotelId: string;
  userId: string;
  reviewText: string;
  rating: number;
}) {
  return postJson(`/hotel/${payload.hotelId}/review/${payload.userId}`, payload);
}
