import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getManageBookingsQuery } from '../api/manage-bookings-api';
import { Card } from '../../../shared/ui/card';
import { EmptyState } from '../../../shared/ui/empty-state';
import { formatCurrency, formatDate } from '../../../shared/lib/format';

export default function ManageBookingsPage() {
  const { data } = useSuspenseQuery(getManageBookingsQuery());
  const { bookings } = data;

  const items = useMemo(() => bookings ?? [], [bookings]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Booking operations</p>
        <h1 className="mt-2 text-3xl font-semibold">Manage reservations</h1>
      </Card>

      {!items.length ? (
        <EmptyState
          title="No bookings loaded"
          description="Once manager reservations are returned by the backend, they will be displayed here in the new dashboard layout."
        />
      ) : (
        <div className="grid gap-4">
          {items.map((booking) => (
            <Card key={booking.bookingId ?? booking._id} className="rounded-[28px] border-white/10 bg-white/5 p-5 text-white shadow-none">
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
                <div>
                  <p className="text-sm text-slate-300">Customer</p>
                  <p className="font-semibold">{booking.customerName ?? 'Guest'}</p>
                  <p className="mt-1 text-sm text-slate-400">{booking.customerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Stay window</p>
                  <p className="font-semibold">{formatDate(booking.checkInDate)}</p>
                  <p className="mt-1 text-sm text-slate-400">{formatDate(booking.checkOutDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Status</p>
                  <p className="font-semibold capitalize">{booking.status ?? 'pending'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-300">Total</p>
                  <p className="font-semibold">{formatCurrency(booking.totalAmount ?? 0)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
