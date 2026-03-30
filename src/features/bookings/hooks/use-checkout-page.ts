import { useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { updateBooking } from '../api/bookings-api';
import { toUpdateBookingRequestDto } from '../dto/checkout-form.dto';
import { useCheckoutForm } from './use-checkout-form';
import { getNightCount } from '../../../shared/lib/format';
import type { BookingRecord, HotelRoom } from '../../../shared/types/domain';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to update booking';
}

export function useCheckoutPage(
  bookingId: string,
  booking: BookingRecord,
  rooms: HotelRoom[],
  defaultPhonePrefix: string
) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const form = useCheckoutForm(defaultPhonePrefix);

  const roomSubtotal = useMemo(
    () => rooms.reduce((total, room) => total + (room.BaseRate ?? 0), 0),
    [rooms]
  );
  const finalPrice = useMemo(() => roomSubtotal * 1.08, [roomSubtotal]);
  const nights = useMemo(
    () => getNightCount(booking.checkInDate, booking.checkOutDate),
    [booking.checkInDate, booking.checkOutDate]
  );
  const selectedArrivalTime = useWatch({
    control: form.control,
    name: 'arrivalTime',
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      setStatus(null);

      await updateBooking(bookingId, toUpdateBookingRequestDto(bookingId, finalPrice, values));

      navigate({
        to: '/booking/$bookingId/final',
        params: { bookingId },
      });
    } catch (error) {
      setStatus(getErrorMessage(error));
    }
  });

  return {
    form,
    status,
    roomSubtotal,
    finalPrice,
    nights,
    selectedArrivalTime,
    submit,
  };
}
