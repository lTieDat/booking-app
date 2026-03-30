import { useMemo, useState } from 'react';
import { useLoaderData } from '@tanstack/react-router';
import { submitReview } from '../api/history-api';
import { Button } from '../../../shared/ui/button';
import { Card } from '../../../shared/ui/card';
import { EmptyState } from '../../../shared/ui/empty-state';
import { Field } from '../../../shared/ui/field';
import { Select } from '../../../shared/ui/select';
import { Textarea } from '../../../shared/ui/textarea';
import { formatCurrency, formatDate, getNightCount, pluralize } from '../../../shared/lib/format';
import type { BookingRecord, Hotel, UserProfile } from '../../../shared/types/domain';

interface BookingWithHotel extends BookingRecord {
  hotel: Hotel;
}

export default function BookingHistoryPage() {
  const { user, bookings } = useLoaderData({ from: '/bookings-trips' }) as {
    user: UserProfile;
    bookings: BookingWithHotel[];
  };
  const [activeBooking, setActiveBooking] = useState<BookingWithHotel | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<string | null>(null);

  const items = useMemo(() => bookings ?? [], [bookings]);

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="No bookings yet"
          description="Once a reservation is completed, it will appear here with review and management actions."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Booking history</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Trips for {user.fullName ?? user.userName ?? user.email}
        </h1>
      </Card>

      <div className="grid gap-5">
        {items.map((booking) => {
          const nights = getNightCount(booking.checkInDate, booking.checkOutDate);

          return (
            <Card key={booking.bookingId ?? booking._id} className="grid gap-5 rounded-[28px] p-4 md:grid-cols-[280px_1fr_auto] md:p-5">
              <div className="overflow-hidden rounded-[24px] bg-slate-100">
                <img
                  src={booking.hotel.images?.imgSource ?? booking.hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/3.png'}
                  alt={booking.hotel.HotelName ?? 'Hotel'}
                  className="h-full min-h-[220px] w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">{booking.hotel.HotelName}</h2>
                <p className="text-sm text-slate-500">Status: {booking.status ?? 'Pending'}</p>
                <p className="text-sm leading-6 text-slate-600">
                  {formatDate(booking.checkInDate)} to {formatDate(booking.checkOutDate)} • {nights}{' '}
                  {pluralize(nights, 'night', 'nights')}
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setActiveBooking(booking)}>
                    {booking.review === 'no reviews' ? 'Add review' : 'See review'}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-3 md:items-end">
                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-500">Total paid</p>
                  <p className="text-2xl font-semibold text-slate-900">{formatCurrency(booking.totalAmount ?? 0)}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {activeBooking ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4">
          <Card className="w-full max-w-xl rounded-[32px] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Review stay</p>
                <h2 className="text-2xl font-semibold text-slate-900">{activeBooking.hotel.HotelName}</h2>
              </div>
              <Button variant="ghost" onClick={() => setActiveBooking(null)}>
                Close
              </Button>
            </div>

            {activeBooking.review !== 'no reviews' && activeBooking.review ? (
              <div className="mt-6 space-y-3">
                <p className="text-sm text-slate-500">Rating: {activeBooking.review.rating}</p>
                <p className="text-sm leading-6 text-slate-600">{activeBooking.review.reviewText}</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <Field label="Rating">
                  <Select value={String(rating)} onChange={(event) => setRating(Number(event.target.value))}>
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Review">
                  <Textarea value={reviewText} onChange={(event) => setReviewText(event.target.value)} />
                </Field>
                {status ? <p className="text-sm font-medium text-slate-700">{status}</p> : null}
                <Button
                  onClick={async () => {
                    try {
                      setStatus(null);
                      await submitReview({
                        bookingId: activeBooking.bookingId ?? '',
                        hotelId: activeBooking.hotelId ?? '',
                        userId: activeBooking.userId ?? '',
                        reviewText,
                        rating,
                      });
                      setStatus('Review submitted successfully.');
                    } catch (error) {
                      setStatus(error instanceof Error ? error.message : 'Unable to submit review');
                    }
                  }}
                >
                  Submit review
                </Button>
              </div>
            )}
          </Card>
        </div>
      ) : null}
    </div>
  );
}
