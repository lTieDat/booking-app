import { Button, Card, EmptyState, Input } from '@booking/ui';
import { formatDate } from '@booking/shared';
import { useAdminReviewsPage } from '../hooks/use-admin-reviews-page';

export default function ReviewsPage() {
  const { items, filter, setFilter, searchTerm, setSearchTerm, stats, status, hide } = useAdminReviewsPage();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Reviews</p>
        <h1 className="mt-2 text-3xl font-semibold">Review moderation and quality signals</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Monitor reviewed stays, surface low-rating feedback quickly, and keep an eye on completed bookings that still
          need follow-up from guests.
        </p>
        {status ? <p className="mt-4 text-sm font-medium text-teal-200">{status}</p> : null}
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Published reviews', stats.totalReviews],
          ['Average rating', stats.averageRating ? stats.averageRating.toFixed(1) : '0.0'],
          ['Low-rating items', stats.lowRatingCount],
          ['Awaiting review', stats.awaitingReviewCount],
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px] border-white/10 bg-white/5 p-5 text-white shadow-none">
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[32px] border-white/10 bg-white/5 p-5 text-white shadow-none">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_auto] lg:items-end">
          <div className="space-y-3">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Search guest, property, or review text</span>
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by hotel, guest email, or review content"
                className="border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-teal-500/20"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['all', 'All items'],
              ['reviewed', 'Reviewed'],
              ['awaiting', 'Awaiting review'],
              ['low-rating', 'Low rating'],
            ].map(([value, label]) => (
              <Button
                key={value}
                variant={filter === value ? 'primary' : 'secondary'}
                className={filter === value ? '' : 'bg-white/5 text-white ring-white/10 hover:bg-white/10'}
                onClick={() => setFilter(value as typeof filter)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {!items.length ? (
        <EmptyState
          title="No review signals match this filter"
          description="Try clearing the search or switching the moderation filter to inspect a broader set of stays."
        />
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card
              key={item.bookingId ?? item.id}
              className="rounded-[28px] border-white/10 bg-white/5 p-5 text-white shadow-none"
            >
              <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold">{item.hotelNameResolved}</h2>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
                      {item.status ?? 'unknown'}
                    </span>
                    {item.awaitingReview ? (
                      <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                        Awaiting guest review
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-slate-300">
                    {item.customerName ?? 'Guest'} • Review id {item.id ?? 'N/A'}
                  </p>
                  <p className="text-sm leading-6 text-slate-400">
                    Submitted: {formatDate(item.createdAt)}
                  </p>
                  {item.hasReview ? (
                    <div className="rounded-[24px] bg-slate-950/40 p-4">
                      <p className="text-sm font-medium text-teal-200">Rating {item.reviewRating ?? 'N/A'} / 5</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {item.reviewText || 'A rating was submitted without written feedback.'}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-[24px] bg-slate-950/40 p-4 text-sm leading-6 text-slate-400">
                      No review content has been submitted for this booking yet.
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 lg:items-end">
                  <span className="text-sm text-slate-400">Booking</span>
                  <span className="font-mono text-sm text-slate-200">{item.bookingId ?? item.id ?? 'N/A'}</span>
                  {item.id ? (
                    <Button variant="danger" onClick={() => hide(item.id)}>
                      Hide review
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
