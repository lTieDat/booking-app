import { useSuspenseQuery } from '@tanstack/react-query';
import { getBookingHistoryQuery } from '../api/history-api';
import { ReviewDialog } from '../components/review-dialog';
import { useBookingHistoryPage } from '../hooks/use-booking-history-page';
import { Button } from '../../../shared/ui/button';
import { Card } from '../../../shared/ui/card';
import { EmptyState } from '../../../shared/ui/empty-state';
import { formatCurrency, formatDate, getNightCount, pluralize } from '../../../shared/lib/format';

export default function BookingHistoryPage() {
  const { data } = useSuspenseQuery(getBookingHistoryQuery());
  const { user, bookings } = data;
  const {
    items,
    activeBooking,
    status,
    reviewForm: {
      register,
      formState: { errors, isSubmitting },
    },
    openReview,
    closeReview,
    submit,
  } = useBookingHistoryPage(user, bookings);

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
                  <Button variant="secondary" onClick={() => openReview(booking)}>
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
        <ReviewDialog
          hotel={activeBooking.hotel}
          existingReview={activeBooking.review !== 'no reviews' ? activeBooking.review ?? null : null}
          register={register}
          errors={errors}
          status={status}
          isSubmitting={isSubmitting}
          onClose={closeReview}
          onSubmit={submit}
        />
      ) : null}
    </div>
  );
}
