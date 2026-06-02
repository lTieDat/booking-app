import { Link, useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@booking/ui';
import { Card } from '@booking/ui';
import { formatCurrency, formatDate } from '@booking/shared';
import { getBookingFinalQuery } from '../api/bookings-api';

export default function FinalPage() {
  const { bookingId } = useParams({ from: '/booking/$bookingId/final' });
  const { data } = useSuspenseQuery(getBookingFinalQuery(bookingId));
  const { booking, payment, invoice } = data;

  return (
    <section className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:px-6 lg:px-8">
      <Card className="glass-panel rounded-[36px] p-8 text-center md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">Booking complete</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-900">
          {booking.status === 'PENDING' ? 'Payment link is ready' : 'Reservation confirmed'}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          Your booking reference is <span className="font-semibold text-slate-900">{booking.bookingId ?? bookingId}</span>.
          Status: <span className="font-semibold text-slate-900">{booking.status ?? 'PENDING'}</span>.
        </p>
        <div className="mt-6 grid gap-3 text-left text-sm text-slate-600 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-slate-500">Check-in</p>
            <p className="font-semibold text-slate-900">{formatDate(booking.checkInDate)}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-slate-500">Check-out</p>
            <p className="font-semibold text-slate-900">{formatDate(booking.checkOutDate)}</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-slate-500">Total</p>
            <p className="font-semibold text-slate-900">{formatCurrency(booking.totalAmount ?? 0)}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {payment?.checkoutUrl ? (
            <a href={payment.checkoutUrl} target="_blank" rel="noreferrer">
              <Button>Pay with payOS</Button>
            </a>
          ) : null}
          <Link to="/bookings-trips">
            <Button variant={payment?.checkoutUrl ? 'secondary' : 'primary'}>View bookings</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">Back to home</Button>
          </Link>
        </div>
      </Card>

      {payment ? (
        <Card className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Payment</p>
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="space-y-2 text-sm text-slate-600">
              <p>Status: <span className="font-semibold text-slate-900">{payment.status}</span></p>
              <p>Provider: {payment.provider ?? 'payOS'}</p>
              <p>Amount: {formatCurrency((payment.amountMinor ?? 0) / 100)}</p>
              {payment.expiresAt ? <p>Expires: {formatDate(payment.expiresAt)}</p> : null}
            </div>
            {payment.qrCode ? <img src={payment.qrCode} alt="Payment QR code" className="h-36 w-36 rounded-2xl object-contain" /> : null}
          </div>
        </Card>
      ) : null}

      {invoice ? (
        <Card className="rounded-[32px] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Invoice</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{invoice.invoiceNo ?? invoice.id}</h2>
          <div className="mt-5 grid gap-3">
            {(invoice.lines ?? []).map((line) => (
              <div key={line.id ?? line.description} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm">
                <span className="text-slate-700">{line.description ?? line.lineType}</span>
                <span className="font-semibold text-slate-900">{formatCurrency((line.totalMinor ?? 0) / 100)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end text-lg font-semibold text-slate-900">
            Total {formatCurrency((invoice.totalMinor ?? 0) / 100)}
          </div>
        </Card>
      ) : null}
    </section>
  );
}
