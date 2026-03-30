import { useLoaderData, useNavigate } from '@tanstack/react-router';
import { Card } from '../../../shared/ui/card';
import { EmptyState } from '../../../shared/ui/empty-state';
import { Button } from '../../../shared/ui/button';
import { formatCurrency } from '../../../shared/lib/format';
import type { Hotel } from '../../../shared/types/domain';

export default function ManagePropertiesPage() {
  const navigate = useNavigate();
  const { hotels } = useLoaderData({ from: '/admin/managePage/manage-properties' }) as {
    hotels: Hotel[];
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Property management</p>
        <h1 className="mt-2 text-3xl font-semibold">Portfolio snapshot</h1>
      </Card>

      {!hotels.length ? (
        <EmptyState
          title="No properties found"
          description="Properties tied to the manager session will show up here once the backend responds."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hotels.map((hotel) => (
            <Card key={hotel.HotelId} className="rounded-[28px] border-white/10 bg-white/5 p-5 text-white shadow-none">
              <img
                src={hotel.images?.imgSource ?? hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/2.png'}
                alt={hotel.HotelName ?? 'Hotel'}
                className="h-52 w-full rounded-[24px] object-cover"
              />
              <div className="mt-4 space-y-2">
                <h2 className="text-2xl font-semibold">{hotel.HotelName}</h2>
                <p className="text-sm text-slate-300">Rating {hotel.Rating ?? 0}</p>
                <p className="text-sm leading-6 text-slate-400">{hotel.Description ?? 'Refactored property card.'}</p>
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-slate-300">Price range</span>
                  <span className="font-semibold text-white">{formatCurrency(hotel.LowestPrice ?? 0)}</span>
                </div>
                <div className="pt-3">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                      navigate({
                        to: '/admin/managePage/manage-properties/$hotelId',
                        params: { hotelId: hotel.HotelId ?? '' },
                      })
                    }
                  >
                    Inspect property
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
