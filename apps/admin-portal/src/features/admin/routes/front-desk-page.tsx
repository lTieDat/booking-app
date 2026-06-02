import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Button, Card, EmptyState } from '@booking/ui';
import { formatCurrency, formatDate, queryClient } from '@booking/shared';
import {
  getCheckInBookingMutation,
  getCheckOutBookingMutation,
  getFrontDeskQuery,
  getNoShowBookingMutation,
} from '../api/manage-bookings-api';

export default function FrontDeskPage() {
  const { data } = useSuspenseQuery(getFrontDeskQuery());
  const checkIn = useMutation(getCheckInBookingMutation());
  const checkOut = useMutation(getCheckOutBookingMutation());
  const noShow = useMutation(getNoShowBookingMutation());

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admin', 'front-desk'] });
  const run = async (action: Promise<unknown>) => {
    await action;
    await refresh();
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Front desk</p>
        <h1 className="mt-2 text-3xl font-semibold">Check-in, check-out, and no-show queue</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Assigned hotels: {data.hotels.map((hotel) => hotel.HotelName).filter(Boolean).join(', ') || 'None'}
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <QueueCard
          title="Arrivals"
          description="Confirmed bookings ready for check-in or no-show handling."
          bookings={data.confirmed}
          action={(bookingId) => (
            <>
              <Button onClick={() => run(checkIn.mutateAsync(bookingId))}>Check in</Button>
              <Button variant="secondary" onClick={() => run(noShow.mutateAsync(bookingId))}>No-show</Button>
            </>
          )}
        />
        <QueueCard
          title="Departures"
          description="Checked-in bookings ready for check-out."
          bookings={data.checkedIn}
          action={(bookingId) => <Button onClick={() => run(checkOut.mutateAsync(bookingId))}>Check out</Button>}
        />
      </div>
    </div>
  );
}

function QueueCard({
  title,
  description,
  bookings,
  action,
}: {
  title: string;
  description: string;
  bookings: Array<{
    bookingId?: string;
    customerName?: string;
    customerEmail?: string;
    checkInDate?: string;
    checkOutDate?: string;
    totalAmount?: number;
  }>;
  action: (bookingId: string) => ReactNode;
}) {
  return (
    <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-5 grid gap-4">
        {!bookings.length ? (
          <EmptyState title="No bookings in this queue" description="This queue will update when matching bookings are available." />
        ) : (
          bookings.map((booking) => (
            <div key={booking.bookingId} className="rounded-[24px] bg-white/5 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{booking.customerName ?? 'Guest'}</p>
                  <p className="text-sm text-slate-300">{booking.customerEmail}</p>
                  <p className="mt-2 text-sm text-slate-400">
                    {formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)}
                  </p>
                </div>
                <p className="font-semibold text-white">{formatCurrency(booking.totalAmount ?? 0)}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">{booking.bookingId ? action(booking.bookingId) : null}</div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
