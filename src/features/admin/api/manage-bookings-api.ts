import { getJson } from '../../../shared/api/http';
import { unwrapData } from '../../../shared/api/unwrap';
import { requireSession } from '../../../shared/routes/guards';
import type { BookingRecord, ManagerProfile } from '../../../shared/types/domain';

interface BookingListResponse {
  bookings?: BookingRecord[];
  totalPages?: number;
}

export async function loadManageBookingsPage() {
  const session = requireSession('manager');
  const manager = session.profile as ManagerProfile;

  const responses = await Promise.all(
    (manager.hotel_id ?? []).map((hotelId) =>
      getJson(`/booking/bookingHistory/manager/${hotelId}`, {
        filterStatus: '',
        searchQuery: '',
        sortBy: '',
        page: 1,
        itemsPerPage: 8,
      })
    )
  );

  const bookings = responses.flatMap((response) => {
    const payload = unwrapData<BookingListResponse | BookingRecord[]>(response);

    if (Array.isArray(payload)) {
      return payload;
    }

    return payload.bookings ?? [];
  });

  return {
    bookings,
  };
}
