import { useSuspenseQuery } from '@tanstack/react-query';
import { getDashboardQuery } from '../api/dashboard-api';
import { Card } from '@booking/ui';
import { formatCurrency } from '@booking/shared';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="rounded-[28px] border-white/10 bg-white/5 p-5 text-white shadow-none">
      <p className="text-sm font-medium text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </Card>
  );
}

export default function DashboardPage() {
  const { data } = useSuspenseQuery(getDashboardQuery());
  const { dashboard, hotels } = data;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total bookings" value={dashboard.totalBookings ?? 0} />
        <StatCard label="Pending bookings" value={dashboard.pendingBookings ?? 0} />
        <StatCard label="Paid bookings" value={dashboard.paidBookings ?? 0} />
        <StatCard label="Confirmed bookings" value={dashboard.confirmedBookings ?? 0} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Revenue overview</p>
          <div className="mt-6 space-y-4">
            {(dashboard.totalRevenue ?? []).map((item) => (
              <div key={item.hotelId} className="space-y-2">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-300">Hotel {item.hotelId}</span>
                  <span className="font-semibold text-white">{formatCurrency(item.totalRevenue)}</span>
                </div>
                <div className="h-3 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                    style={{
                      width: `${Math.min(100, Math.max(12, (item.totalRevenue / Math.max(...dashboard.totalRevenue.map((entry) => entry.totalRevenue), 1)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Managed properties</p>
          <div className="mt-6 grid gap-4">
            {hotels.map((hotel) => (
              <div key={hotel.HotelId} className="flex items-center gap-4 rounded-3xl bg-white/5 p-4">
                <img
                  src={hotel.images?.imgSource ?? hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/1.png'}
                  alt={hotel.HotelName ?? 'Hotel'}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{hotel.HotelName}</p>
                  <p className="text-sm text-slate-300">Rating {hotel.Rating ?? 0}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
