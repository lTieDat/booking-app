import { useMemo, useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import {
  getCheckInBookingMutation,
  getCheckOutBookingMutation,
  getManualRefundMutation,
  getManageBookingsQuery,
  getNoShowBookingMutation,
  getUpdateBookingStatusMutation,
} from '../api/manage-bookings-api';
import { Card } from '@booking/ui';
import { EmptyState } from '@booking/ui';
import { Button, Field, Input } from '@booking/ui';
import { formatCurrency, formatDate, queryClient } from '@booking/shared';

export default function ManageBookingsPage() {
  const { data } = useSuspenseQuery(getManageBookingsQuery());
  const { bookings } = data;
  const [status, setStatus] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState('');
  const updateStatus = useMutation(getUpdateBookingStatusMutation());
  const checkIn = useMutation(getCheckInBookingMutation());
  const checkOut = useMutation(getCheckOutBookingMutation());
  const noShow = useMutation(getNoShowBookingMutation());
  const refund = useMutation(getManualRefundMutation());

  const items = useMemo(() => bookings ?? [], [bookings]);

  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] }),
      queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard'] }),
    ]);
  };

  const runAction = async (action: () => Promise<unknown>) => {
    try {
      setStatus(null);
      await action();
      await refresh();
      setStatus('Booking operation completed.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Booking operation failed');
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Booking operations</p>
        <h1 className="mt-2 text-3xl font-semibold">Manage reservations</h1>
        {status ? <p className="mt-4 text-sm font-medium text-teal-200">{status}</p> : null}
        <div className="mt-5 max-w-xl">
          <Field label="Payment id for manual refund">
            <Input
              value={paymentId}
              onChange={(event) => setPaymentId(event.target.value)}
              placeholder="Paste payment UUID before refunding"
              className="border-white/10 bg-slate-950/40 text-white"
            />
          </Field>
        </div>
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
              <div className="mt-5 flex flex-wrap gap-2">
                {booking.status === 'PENDING' ? (
                  <>
                    <Button
                      onClick={() =>
                        booking.bookingId &&
                        runAction(() =>
                          updateStatus.mutateAsync({
                            bookingId: booking.bookingId ?? '',
                            data: { status: 'CONFIRMED', reason: 'Confirmed by admin portal' },
                          })
                        )
                      }
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        booking.bookingId &&
                        runAction(() =>
                          updateStatus.mutateAsync({
                            bookingId: booking.bookingId ?? '',
                            data: { status: 'CANCELLED', reason: 'Cancelled by admin portal' },
                          })
                        )
                      }
                    >
                      Cancel
                    </Button>
                  </>
                ) : null}
                {booking.status === 'CONFIRMED' ? (
                  <>
                    <Button onClick={() => booking.bookingId && runAction(() => checkIn.mutateAsync(booking.bookingId ?? ''))}>
                      Check in
                    </Button>
                    <Button variant="secondary" onClick={() => booking.bookingId && runAction(() => noShow.mutateAsync(booking.bookingId ?? ''))}>
                      No-show
                    </Button>
                  </>
                ) : null}
                {booking.status === 'CHECKED_IN' ? (
                  <Button onClick={() => booking.bookingId && runAction(() => checkOut.mutateAsync(booking.bookingId ?? ''))}>
                    Check out
                  </Button>
                ) : null}
                <Button
                  variant="secondary"
                  disabled={!paymentId.trim()}
                  onClick={() =>
                    runAction(() =>
                      refund.mutateAsync({
                        paymentId: paymentId.trim(),
                        data: { reason: `Manual refund for booking ${booking.bookingId ?? 'unknown'}` },
                      })
                    )
                  }
                >
                  Manual refund
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
