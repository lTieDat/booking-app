import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type { ApiEnvelope, ApiResponse } from '../contracts';
import { HttpClient } from '../http';
import { unwrapData } from '../unwrap';
import type { BookingSearch, Hotel } from '../../types/domain';
import type {
  CreateDraftBookingRequestBody,
  CreateDraftBookingResponseBody,
  SelectedRoomRequestBody,
} from '../../../features/hotels/api/hotels-api';

export class HotelApi {
  private readonly BASE_PATH = '/hotel';

  constructor(private readonly client: HttpClient) {}

  detail(hotelId: string, search: BookingSearch) {
    return queryOptions({
      queryKey: ['hotel', 'detail', hotelId, search],
      queryFn: async ({ signal }) => {
        const response = await this.client.get<ApiResponse<Hotel>>(`${this.BASE_PATH}/${hotelId}`, {
          query: { ...search },
          signal,
        });

        return unwrapData<Hotel>(response);
      },
    });
  }

  createDraftBooking() {
    return mutationOptions({
      mutationKey: ['booking', 'draft', 'create'],
      mutationFn: async (payload: CreateDraftBookingRequestBody) => {
        const response = await this.client.post<ApiEnvelope<string | CreateDraftBookingResponseBody>>(
          '/booking/create',
          payload
        );
        const data = unwrapData<string | CreateDraftBookingResponseBody>(response);

        if (typeof data === 'string') {
          return data;
        }

        if (data.bookingId) {
          return data.bookingId;
        }

        throw new Error('Booking id was not returned by the server');
      },
    });
  }
}
