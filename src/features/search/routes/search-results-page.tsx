import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card } from '../../../shared/ui/card';
import { EmptyState } from '../../../shared/ui/empty-state';
import { Button } from '../../../shared/ui/button';
import { formatCurrency } from '../../../shared/lib/format';
import { getSearchResultsQuery } from '../api/search-api';
import { SearchForm } from '../components/search-form';
import { useBookingSearchQuery } from '../hooks/use-booking-search-query';

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const { bookingSearch, pushSearch, openHotelDetail } = useBookingSearchQuery();
  const { data: hotels } = useSuspenseQuery(getSearchResultsQuery(bookingSearch));

  const results = useMemo(() => hotels ?? [], [hotels]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="glass-panel rounded-[32px] p-6">
        <div className="mb-4 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Search results</p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900">
            {bookingSearch.city || bookingSearch.country
              ? `Hotels in ${[bookingSearch.city, bookingSearch.country].filter(Boolean).join(', ')}`
              : 'Explore stays'}
          </h1>
        </div>
        <SearchForm
          initialValues={bookingSearch}
          submitLabel="Refresh search"
          onSubmit={pushSearch}
        />
      </Card>

      {results.length === 0 ? (
        <EmptyState
          title="No stays matched this search"
          description="Try adjusting the city, dates or guest count to explore a broader set of stays."
          actionLabel="Back to home"
          onAction={() => navigate({ to: '/' })}
        />
      ) : (
        <div className="grid gap-5">
          {results.map((hotel) => (
            <Card key={hotel.HotelId} className="grid gap-5 rounded-[28px] p-4 md:grid-cols-[300px_1fr_auto] md:p-5">
              <div className="overflow-hidden rounded-[24px] bg-slate-100">
                <img
                  src={hotel.images?.imgSource ?? hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/1.png'}
                  alt={hotel.HotelName ?? 'Hotel'}
                  className="h-full min-h-[220px] w-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{hotel.HotelName}</h2>
                    <p className="text-sm text-slate-500">Rating {hotel.Rating ?? 0} • {hotel.NumberOfRooms ?? 0} rooms left</p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-600">{hotel.Description ?? 'A comfortable stay with a booking flow designed for quick comparison and smooth checkout.'}</p>
              </div>
              <div className="flex flex-col justify-between gap-4 md:items-end">
                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-500">Starting from</p>
                  <p className="text-3xl font-semibold text-slate-900">{formatCurrency(hotel.LowestPrice ?? 0)}</p>
                </div>
                <Button
                  onClick={() => openHotelDetail(hotel.HotelId ?? '')}
                >
                  View details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
