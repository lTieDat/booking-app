import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { getPropertyDetailQuery } from '../api/manage-properties-api';
import { Card } from '@booking/ui';
import { Button } from '@booking/ui';
import { formatCurrency } from '@booking/shared';

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="rounded-[24px] border-white/10 bg-white/5 p-5 text-white shadow-none">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </Card>
  );
}

export default function PropertyDetailPage() {
  const { hotelId } = useParams({ from: '/admin/managePage/manage-properties/$hotelId' });
  const { data } = useSuspenseQuery(getPropertyDetailQuery(hotelId));
  const { hotel, statistics } = data;

  const customerCountries = Object.entries(statistics.customerCountByCountry ?? {}).sort((left, right) => right[1] - left[1]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Property detail</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white">{hotel.HotelName}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            {hotel.Description ?? 'Detailed property management view on the new feature-based architecture.'}
          </p>
        </div>
        <Link to="/admin/managePage/manage-properties">
          <Button variant="secondary">Back to properties</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <img
            src={hotel.images?.imgSource ?? hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/3.png'}
            alt={hotel.HotelName ?? 'Hotel'}
            className="h-[360px] w-full rounded-[28px] object-cover"
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-300">Address</p>
              <p className="mt-2 font-medium text-white">
                {hotel.Address?.StreetAddress}, {hotel.Address?.City}, {hotel.Address?.Country}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-300">Price window</p>
              <p className="mt-2 font-medium text-white">
                {formatCurrency(hotel.LowestPrice ?? 0)} - {formatCurrency(hotel.HighestPrice ?? hotel.LowestPrice ?? 0)}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Metric label="Total bookings" value={statistics.totalBookings ?? 0} />
          <Metric label="Total customers" value={statistics.totalOccupancy ?? 0} />
          <Metric label="Total revenue" value={formatCurrency(statistics.totalRevenue ?? 0)} />
          <Metric label="Average stay" value={`${Number(statistics.averageStayDuration ?? 0).toFixed(1)} days`} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Room inventory</p>
          <div className="mt-5 grid gap-4">
            {(hotel.Rooms ?? []).map((room) => (
              <div key={String(room.RoomId ?? room.roomId)} className="rounded-[24px] bg-white/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{room.RoomType}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{room.Description}</p>
                  </div>
                  <span className="font-semibold text-white">{formatCurrency(room.BaseRate ?? 0)}</span>
                </div>
                {(room.RoomTags ?? []).length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(room.RoomTags ?? []).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Guest origins</p>
          <div className="mt-5 space-y-4">
            {customerCountries.length ? (
              customerCountries.map(([country, count]) => {
                const maxValue = Math.max(...customerCountries.map((entry) => entry[1]), 1);
                const width = Math.max(12, (count / maxValue) * 100);

                return (
                  <div key={country} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-200">{country}</span>
                      <span className="font-semibold text-white">{count}</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm leading-6 text-slate-300">No country statistics were returned for this property yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
