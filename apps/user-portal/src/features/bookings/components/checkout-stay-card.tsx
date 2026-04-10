import { Card } from '@booking/ui';
import { formatCurrency, formatDate, pluralize } from '@booking/shared';
import type { BookingRecord, Hotel, HotelRoom } from '@booking/shared';

interface CheckoutStayCardProps {
  booking: BookingRecord;
  hotel: Hotel;
  rooms: HotelRoom[];
  nights: number;
}

export function CheckoutStayCard({ booking, hotel, rooms, nights }: CheckoutStayCardProps) {
  return (
    <div className="space-y-6">
      <Card className="rounded-[32px] p-6">
        <div className="overflow-hidden rounded-[24px] bg-slate-100">
          <img
            src={hotel.images?.imgSource ?? hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/2.png'}
            alt={hotel.HotelName ?? 'Hotel'}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-5 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Selected hotel</p>
          <h1 className="text-3xl font-semibold text-slate-900">{hotel.HotelName}</h1>
          <p className="text-sm leading-6 text-slate-600">
            {hotel.Address?.StreetAddress}, {hotel.Address?.City}, {hotel.Address?.Country}
          </p>
        </div>
      </Card>

      <Card className="rounded-[32px] p-6">
        <h2 className="text-xl font-semibold text-slate-900">Booking details</h2>
        <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
          <p>
            Check-in: <span className="font-medium text-slate-900">{formatDate(booking.checkInDate)}</span>
          </p>
          <p>
            Check-out: <span className="font-medium text-slate-900">{formatDate(booking.checkOutDate)}</span>
          </p>
          <p>
            Duration: <span className="font-medium text-slate-900">{nights} {pluralize(nights, 'night', 'nights')}</span>
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {rooms.map((room) => (
            <div key={String(room.RoomId ?? room.roomId)} className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{room.RoomType}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{room.Description}</p>
                </div>
                <p className="font-semibold text-slate-900">{formatCurrency(room.BaseRate ?? 0)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
