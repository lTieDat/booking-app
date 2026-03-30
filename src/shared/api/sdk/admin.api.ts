import { queryOptions } from '@tanstack/react-query';
import type { ApiResponse } from '../contracts';
import { HttpClient } from '../http';
import { unwrapData } from '../unwrap';
import { requireSession } from '../../routes/guards';
import type { BookingRecord, DashboardData, Hotel, HotelStatistics, ManagerProfile } from '../../types/domain';

interface DashboardQueryData {
  dashboard: DashboardData;
  hotels: Hotel[];
}

interface ManageBookingsQueryData {
  bookings: BookingRecord[];
}

interface ManagePropertiesQueryData {
  hotels: Hotel[];
}

interface PropertyDetailQueryData {
  hotel: Hotel;
  statistics: HotelStatistics;
}

interface BookingListResponseBody {
  bookings?: BookingRecord[];
  totalPages?: number;
}

export class AdminApi {
  constructor(private readonly client: HttpClient) {}

  dashboard() {
    return queryOptions({
      queryKey: ['admin', 'dashboard'],
      queryFn: async ({ signal }) => {
        const session = requireSession('manager');
        const manager = session.profile as ManagerProfile;

        const [dashboardResponse, hotelResponses] = await Promise.all([
          this.client.get<ApiResponse<DashboardData>>(`/admin/dashboard/${session.token}`, { signal }),
          Promise.all(
            (manager.hotel_id ?? []).map((hotelId) =>
              this.client.get<ApiResponse<Hotel>>(`/hotel/${hotelId}`, { signal })
            )
          ),
        ]);

        return {
          dashboard: unwrapData<DashboardData>(dashboardResponse),
          hotels: hotelResponses.map((response) => unwrapData<Hotel>(response)),
        } satisfies DashboardQueryData;
      },
    });
  }

  manageBookings() {
    return queryOptions({
      queryKey: ['admin', 'bookings'],
      queryFn: async ({ signal }) => {
        const session = requireSession('manager');
        const manager = session.profile as ManagerProfile;

        const responses = await Promise.all(
          (manager.hotel_id ?? []).map((hotelId) =>
            this.client.get<ApiResponse<BookingListResponseBody | BookingRecord[]>>(
              `/booking/bookingHistory/manager/${hotelId}`,
              {
                signal,
                query: {
                  filterStatus: '',
                  searchQuery: '',
                  sortBy: '',
                  page: 1,
                  itemsPerPage: 8,
                },
              }
            )
          )
        );

        const bookings = responses.flatMap((response) => {
          const payload = unwrapData<BookingListResponseBody | BookingRecord[]>(response);
          return Array.isArray(payload) ? payload : payload.bookings ?? [];
        });

        return {
          bookings,
        } satisfies ManageBookingsQueryData;
      },
    });
  }

  manageProperties() {
    return queryOptions({
      queryKey: ['admin', 'properties'],
      queryFn: async ({ signal }) => {
        const session = requireSession('manager');
        const manager = session.profile as ManagerProfile;

        const responses = await Promise.all(
          (manager.hotel_id ?? []).map((hotelId) =>
            this.client.get<ApiResponse<Hotel>>(`/hotel/${hotelId}`, { signal })
          )
        );

        return {
          hotels: responses.map((response) => unwrapData<Hotel>(response)),
        } satisfies ManagePropertiesQueryData;
      },
    });
  }

  propertyDetail(hotelId: string) {
    return queryOptions({
      queryKey: ['admin', 'properties', 'detail', hotelId],
      queryFn: async ({ signal }) => {
        requireSession('manager');

        const [hotelResponse, statisticsResponse] = await Promise.all([
          this.client.get<ApiResponse<Hotel>>(`/hotel/${hotelId}`, { signal }),
          this.client.get<ApiResponse<HotelStatistics>>(`/hotel/${hotelId}/statistics`, { signal }),
        ]);

        return {
          hotel: unwrapData<Hotel>(hotelResponse),
          statistics: unwrapData<HotelStatistics>(statisticsResponse),
        } satisfies PropertyDetailQueryData;
      },
    });
  }
}
