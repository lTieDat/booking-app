import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { requireSession } from '../../routes/guards';
import type { BookingRecord, Hotel, HotelRoom, InvoiceRecord, PaymentRecord, PrefixOption, UserProfile } from '../../types/domain';
import type { SpringApiClient } from '../spring-client';
import { syncSpringAuth } from '../spring-client';
import {
  mapBookingResponseToRecord,
  mapHotelResponseToHotel,
  mapInvoiceResponseToRecord,
  mapPaymentResponseToRecord,
  mapReviewToBookingReview,
  pageContent,
  springData,
} from '../mappers';
import { readCheckoutDraft } from './hotel.api';

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
  identifyCardNo?: string;
  discountCode?: string;
}

export interface UpdateBookingResponseBody {
  message?: string;
  booking?: BookingRecord;
  payment?: PaymentRecord;
}

// ---- Inlined from features/bookings/api/history-api ----
export interface ReviewRequestBody {
  bookingId: string;
  hotelId: string;
  userId: string;
  reviewText: string;
  rating: number;
  reviewId?: string;
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

interface BookingFinalQueryData {
  booking: BookingRecord;
  payment?: PaymentRecord;
  invoice?: InvoiceRecord;
}

const PAYMENT_BY_BOOKING_KEY = 'booking.paymentByBooking.v1.';

const DEFAULT_PREFIXES: PrefixOption[] = [
  { code: 'VN', name: 'Vietnam', dial_code: '+84' },
  { code: 'US', name: 'United States', dial_code: '+1' },
  { code: 'SG', name: 'Singapore', dial_code: '+65' },
];

export function readStoredPaymentId(bookingId: string) {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage.getItem(`${PAYMENT_BY_BOOKING_KEY}${bookingId}`);
}

function storePaymentId(bookingId: string, paymentId?: string) {
  if (typeof window === 'undefined' || !paymentId) return;
  window.sessionStorage.setItem(`${PAYMENT_BY_BOOKING_KEY}${bookingId}`, paymentId);
}

export class BookingApi {
  constructor(private readonly client: SpringApiClient) {}

  checkout(draftId: string) {
    return queryOptions({
      queryKey: ['booking', 'checkout', draftId],
      queryFn: async ({ signal }) => {
        const draft = readCheckoutDraft(draftId);
        if (!draft) {
          throw new Error('Checkout draft was not found. Please select rooms again.');
        }

        const [hotelResponse, roomTypesResponse] = await Promise.all([
          this.client.api.getHotel(draft.hotelId, { signal }),
          this.client.api.getRoomTypes(draft.hotelId, { signal }),
        ]);
        const selectedIds = new Set(draft.selectedRooms.map((room) => room.roomId));
        const rooms = springData(roomTypesResponse)
          .filter((roomType) => roomType.id && selectedIds.has(roomType.id))
          .map((roomType) => {
            const selected = draft.selectedRooms.find((room) => room.roomId === roomType.id);
            return {
              RoomId: roomType.id,
              roomId: roomType.id,
              roomTypeId: roomType.id,
              RoomType: roomType.name,
              Description: roomType.description,
              BaseRate: Number(roomType.basePrice ?? 0) * Math.max(1, selected?.quantity ?? 1),
              BedOptions: roomType.bedType,
              MaxOccupancy: roomType.maxOccupancy,
              RoomTags: (roomType.amenities ?? []).map((amenity) => amenity.name).filter(Boolean) as string[],
            } satisfies HotelRoom;
          });
        const hotel = mapHotelResponseToHotel(springData(hotelResponse), rooms);

        return {
          booking: {
            bookingId: draft.id,
            hotelId: draft.hotelId,
            checkInDate: draft.booking.startDate,
            checkOutDate: draft.booking.endDate,
            numberOfAdults: draft.booking.adults,
            numberOfChildren: draft.booking.children,
            status: 'DRAFT',
            rooms: draft.selectedRooms.map((room) => ({ roomId: room.roomId })),
            originalPrice: rooms.reduce((total, room) => total + (room.BaseRate ?? 0), 0),
            totalAmount: rooms.reduce((total, room) => total + (room.BaseRate ?? 0), 0),
          },
          hotel,
          prefixes: DEFAULT_PREFIXES,
          rooms,
        } satisfies CheckoutQueryData;
      },
    });
  }

  history() {
    return queryOptions({
      queryKey: ['booking', 'history'],
      queryFn: async ({ signal }) => {
        const session = requireSession('user');
        syncSpringAuth(this.client, session.token);

        const [userResponse, bookingsResponse, reviewsResponse] = await Promise.all([
          this.client.api.getCurrentUser({ signal }),
          this.client.api.getMyBookings({ page: 0, size: 100 }, { signal }),
          this.client.api.getMyReviews({ page: 0, size: 100 }, { signal }).catch(() => null),
        ]);
        const user = {
          _id: springData(userResponse).id,
          token: session.token,
          userName: springData(userResponse).username,
          fullName: springData(userResponse).name ?? springData(userResponse).username,
          email: springData(userResponse).username,
        } satisfies UserProfile;
        const reviewsByBooking = new Map(
          pageContent<Parameters<typeof mapReviewToBookingReview>[0]>(reviewsResponse ? springData(reviewsResponse) : undefined)
            .filter((review) => review?.bookingId)
            .map((review) => [review?.bookingId, review] as const)
        );

        return {
          user,
          bookings: pageContent<Parameters<typeof mapBookingResponseToRecord>[0]>(springData(bookingsResponse)).map((booking) => {
            const mapped = mapBookingResponseToRecord(booking);
            return {
              ...mapped,
              review: mapReviewToBookingReview(reviewsByBooking.get(booking.id)),
              hotel: {
                HotelId: mapped.hotelId,
                HotelName: mapped.hotelName ?? 'Booked stay',
                Description: 'Hotel details are available from the booking room snapshots.',
                Images: [],
              },
            };
          }),
        } satisfies BookingHistoryQueryData;
      },
    });
  }

  final(bookingId: string) {
    return queryOptions({
      queryKey: ['booking', 'final', bookingId],
      queryFn: async ({ signal }) => {
        syncSpringAuth(this.client);
        const booking = mapBookingResponseToRecord(springData(await this.client.api.getBooking(bookingId, { signal })));
        const paymentId = readStoredPaymentId(bookingId);
        if (!paymentId) {
          return { booking } satisfies BookingFinalQueryData;
        }

        const payment = mapPaymentResponseToRecord(springData(await this.client.api.getPayment(paymentId, { signal })));
        const invoice = await this.client.api
          .getInvoiceByPayment(paymentId, { signal })
          .then((response) => mapInvoiceResponseToRecord(springData(response)))
          .catch(() => undefined);

        return { booking, payment, invoice } satisfies BookingFinalQueryData;
      },
    });
  }

  update(draftId: string) {
    return mutationOptions({
      mutationKey: ['booking', 'create-and-pay', draftId],
      mutationFn: async (payload: UpdateBookingRequestDto) => {
        const session = requireSession('user');
        syncSpringAuth(this.client, session.token);
        const draft = readCheckoutDraft(draftId);
        if (!draft) throw new Error('Checkout draft was not found. Please select rooms again.');

        const bookingResponse = springData(
          await this.client.api.createBooking(
            {
              rooms: draft.selectedRooms.map((room) => ({
                roomTypeId: room.roomId,
                quantity: room.quantity,
              })),
              checkInDate: toDateTime(draft.booking.startDate, '14:00:00'),
              checkOutDate: toDateTime(draft.booking.endDate, '12:00:00'),
              discountCode: payload.discountCode || undefined,
              guest: {
                ...splitName(payload.customerName),
                identifyCardNo: payload.identifyCardNo ?? fallbackIdentity(payload.customerEmail),
                phoneNumber: payload.phoneNo,
                email: payload.customerEmail,
              },
            },
            {
              headers: {
                'Idempotency-Key': draft.id,
              },
            }
          )
        );
        const paymentResponse = springData(await this.client.api.createPayosPayment(bookingResponse.id ?? ''));
        storePaymentId(bookingResponse.id ?? '', paymentResponse.paymentId);

        return {
          message: 'Booking created. Payment link is ready.',
          booking: mapBookingResponseToRecord(bookingResponse),
          payment: mapPaymentResponseToRecord(paymentResponse),
        } satisfies UpdateBookingResponseBody;
      },
    });
  }

  submitReview() {
    return mutationOptions({
      mutationKey: ['booking', 'review', 'submit'],
      mutationFn: async (payload: ReviewRequestBody) => {
        syncSpringAuth(this.client);
        const response = payload.reviewId
          ? await this.client.api.updateReview(payload.reviewId, {
              rating: payload.rating,
              comment: payload.reviewText,
            })
          : await this.client.api.createBookingReview(payload.bookingId, {
              rating: payload.rating,
              comment: payload.reviewText,
            });
        return {
          message: 'Review saved.',
          review: mapReviewToBookingReview(springData(response)),
        } satisfies ReviewResponseBody;
      },
    });
  }

  hideReview() {
    return mutationOptions({
      mutationKey: ['booking', 'review', 'hide'],
      mutationFn: async (reviewId: string) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.hideReview(reviewId));
      },
    });
  }

  cancel() {
    return mutationOptions({
      mutationKey: ['booking', 'cancel'],
      mutationFn: async ({ bookingId, reason }: { bookingId: string; reason: string }) => {
        syncSpringAuth(this.client);
        return springData(await this.client.api.cancelBooking(bookingId, { reason }));
      },
    });
  }
}

function toDateTime(value: string, time: string) {
  if (!value) return new Date().toISOString();
  if (value.includes('T')) return value;
  return `${value}T${time}`;
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: 'Guest', lastName: 'Guest' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: 'Guest' };
  }
  return {
    firstName: parts[0],
    middleName: parts.length > 2 ? parts.slice(1, -1).join(' ') : undefined,
    lastName: parts[parts.length - 1],
  };
}

function fallbackIdentity(email: string) {
  return email.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12).padEnd(6, '0');
}
