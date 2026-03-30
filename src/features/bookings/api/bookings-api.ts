import { api } from '../../../shared/api';
import type { BookingRecord } from '../../../shared/types/domain';
import type { UpdateBookingRequestDto } from '../dto/checkout-form.dto';

export interface CheckoutBookingResponseBody extends BookingRecord {
  hotelId?: string;
}

export interface UpdateBookingResponseBody {
  message?: string;
  booking?: BookingRecord;
}

export function getCheckoutQuery(bookingId: string) {
  return api.booking.checkout(bookingId);
}

export function getUpdateBookingMutation(bookingId: string) {
  return api.booking.update(bookingId);
}
