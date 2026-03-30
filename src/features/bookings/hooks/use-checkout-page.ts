import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useWatch } from 'react-hook-form';
import { getUpdateBookingMutation } from '../api/bookings-api';
import { toUpdateBookingRequestDto } from '../dto/checkout-form.dto';
import { useCheckoutForm } from './use-checkout-form';
import { getNightCount } from '../../../shared/lib/format';
import { queryClient } from '../../../shared/query/query-client';
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
  const updateBookingMutation = useMutation(getUpdateBookingMutation(bookingId));

  const calculatedRoomSubtotal = useMemo(
    () => rooms.reduce((total, room) => total + (room.BaseRate ?? 0), 0),
    [rooms]
  );
  const roomSubtotal = useMemo(() => {
    if (typeof booking.originalPrice === 'number' && booking.originalPrice > 0) {
      return booking.originalPrice;
    }

    if (typeof booking.totalAmount === 'number' && booking.totalAmount > 0) {
      return booking.totalAmount;
    }

    return calculatedRoomSubtotal;
  }, [booking.originalPrice, booking.totalAmount, calculatedRoomSubtotal]);
  const finalPrice = useMemo(() => {
    if (typeof booking.totalAmount === 'number' && booking.totalAmount > 0) {
      return booking.totalAmount;
    }

    return roomSubtotal;
  }, [booking.totalAmount, roomSubtotal]);
  const nights = useMemo(
    () => getNightCount(booking.checkInDate, booking.checkOutDate),
    [booking.checkInDate, booking.checkOutDate]
  );
  const taxesAndFees = useMemo(() => Math.max(0, finalPrice - roomSubtotal), [finalPrice, roomSubtotal]);
  const selectedArrivalTime = useWatch({
    control: form.control,
    name: 'arrivalTime',
  });

  const submit = form.handleSubmit(async (values) => {
    try {
      setStatus(null);

      await updateBookingMutation.mutateAsync(toUpdateBookingRequestDto(bookingId, finalPrice, values));
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['booking', 'checkout', bookingId] }),
        queryClient.invalidateQueries({ queryKey: ['booking', 'history'] }),
      ]);

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
    taxesAndFees,
    nights,
    selectedArrivalTime,
    submit,
  };
}
