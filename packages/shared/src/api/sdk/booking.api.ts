import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type { ApiEnvelope, ApiResponse } from '../contracts';
import { HttpClient } from '../http';
import { unwrapData } from '../unwrap';
import { requireSession } from '../../routes/guards';
import type { BookingRecord, Hotel, HotelRoom, PrefixOption, UserProfile } from '../../types/domain';

// ---- Inlined from features/bookings/dto/checkout-form.dto ----
export interface UpdateBookingRequestDto {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  phoneNo: string;
  country: string;
  finalPrice: number;
  arrivalTime: string;
  airportShuttle: boolean;
  rentalCar: boolean;
  taxiShuttle: boolean;
  specialRequest: string;
}

export interface UpdateBookingResponseBody {
  message?: string;
  booking?: BookingRecord;
}

// ---- Inlined from features/bookings/api/history-api ----
export interface ReviewRequestBody {
  bookingId: string;
  hotelId: string;
  userId: string;
  reviewText: string;
  rating: number;
}

export interface ReviewResponseBody {
  message?: string;
  review?: BookingRecord['review'];
}
// ----------------------------------------------------------

interface CheckoutBookingResponseBody extends BookingRecord {
  hotelId?: string;
}

interface CheckoutQueryData {
  booking: CheckoutBookingResponseBody;
  hotel: Hotel;
  rooms: HotelRoom[];
  prefixes: PrefixOption[];
}

interface BookingWithHotel extends BookingRecord {
  hotel: Hotel;
}

interface BookingHistoryQueryData {
  user: UserProfile;
  bookings: BookingWithHotel[];
}

export class BookingApi {
  constructor(private readonly client: HttpClient) {}

  checkout(bookingId: string) {
    return queryOptions({
      queryKey: ['booking', 'checkout', bookingId],
      queryFn: async ({ signal }) => {
        const bookingResponse = await this.client.get<ApiResponse<CheckoutBookingResponseBody>>(`/booking/${bookingId}`, {
          signal,
        });
        const booking = unwrapData<CheckoutBookingResponseBody>(bookingResponse);
        const roomIds = booking.rooms?.map((room) => room.roomId) ?? [];

        const [prefixResponse, hotelResponse, roomResponses] = await Promise.all([
          this.client.get<ApiResponse<PrefixOption[]>>('/users/prefix', { signal }),
          this.client.get<ApiResponse<Hotel>>(`/hotel/${booking.hotelId}`, { signal }),
          Promise.all(
            roomIds.map((roomId) =>
              this.client.get<ApiResponse<HotelRoom>>(`/hotel/rooms/${roomId}`, { signal })
            )
          ),
        ]);

        return {
          booking,
          hotel: unwrapData<Hotel>(hotelResponse),
          prefixes: unwrapData<PrefixOption[]>(prefixResponse) ?? [],
          rooms: roomResponses.map((roomResponse) => unwrapData<HotelRoom>(roomResponse)),
        } satisfies CheckoutQueryData;
      },
    });
  }

  history() {
    return queryOptions({
      queryKey: ['booking', 'history'],
      queryFn: async ({ signal }) => {
        const session = requireSession('user');
        const userResponse = await this.client.get<ApiResponse<UserProfile>>('/users/me', {
          signal,
          query: { tokenID: session.token },
        });
        const user = unwrapData<UserProfile>(userResponse);

        if (!user.email) {
          return {
            user,
            bookings: [],
          } satisfies BookingHistoryQueryData;
        }

        const bookingsResponse = await this.client.get<ApiResponse<BookingRecord[]>>(
          `/booking/bookingHistory/${user.email}`,
          { signal }
        );
        const bookings = unwrapData<BookingRecord[]>(bookingsResponse) ?? [];
        const hotelIds = [...new Set(bookings.map((booking) => booking.hotelId).filter(Boolean))] as string[];
        const hotelResponses = await Promise.all(
          hotelIds.map((hotelId) => this.client.get<ApiResponse<Hotel>>(`/hotel/${hotelId}`, { signal }))
        );
        const hotelsById = new Map(
          hotelResponses.map((response) => {
            const hotel = unwrapData<Hotel>(response);
            return [hotel.HotelId ?? hotel.id ?? '', hotel] as const;
          })
        );

        return {
          user,
          bookings: bookings.map((booking) => ({
            ...booking,
            hotel: hotelsById.get(booking.hotelId ?? '') ?? {},
          })),
        } satisfies BookingHistoryQueryData;
      },
    });
  }

  update(bookingId: string) {
    return mutationOptions({
      mutationKey: ['booking', 'update', bookingId],
      mutationFn: (payload: UpdateBookingRequestDto) =>
        this.client.post<ApiEnvelope<UpdateBookingResponseBody>>(`/booking/${bookingId}/update`, payload),
    });
  }

  submitReview() {
    return mutationOptions({
      mutationKey: ['booking', 'review', 'submit'],
      mutationFn: (payload: ReviewRequestBody) =>
        this.client.post<ApiEnvelope<ReviewResponseBody>>(`/hotel/${payload.hotelId}/review/${payload.userId}`, payload),
    });
  }
}
