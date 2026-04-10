import { startTransition, useMemo, useState, useTransition } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Card } from '@booking/ui';
import { Button } from '@booking/ui';
import { formatCurrency } from '@booking/shared';
import { getCreateDraftBookingMutation, getHotelDetailQuery } from '../api/hotels-api';
import { useBookingSearchQuery } from '../../search/hooks/use-booking-search-query';

export default function HotelDetailPage() {
  const navigate = useNavigate();
  const bookingSearch = useBookingSearchQuery().bookingSearch;
  const { hotelId } = useParams({ from: '/hotelDetail/$hotelId' });
  const { data: hotel } = useSuspenseQuery(getHotelDetailQuery(hotelId, bookingSearch));
  const createDraftBookingMutation = useMutation(getCreateDraftBookingMutation());
  const [pending, startBookingTransition] = useTransition();
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [status, setStatus] = useState<string | null>(null);

  const rooms = useMemo(() => hotel.Rooms ?? [], [hotel.Rooms]);
  const requestedRooms = useMemo(() => Math.max(1, bookingSearch.rooms || 1), [bookingSearch.rooms]);
  const totalSelectedRooms = useMemo(
    () => Object.values(selection).reduce((total, value) => total + value, 0),
    [selection]
  );

  const updateQuantity = (roomId: string, nextQuantity: number) => {
    setSelection((current) => {
      const currentQuantity = current[roomId] ?? 0;
      const sanitizedQuantity = Math.max(0, nextQuantity);
      const nextTotal = totalSelectedRooms - currentQuantity + sanitizedQuantity;

      if (nextTotal > requestedRooms) {
        setStatus(`You can select up to ${requestedRooms} room${requestedRooms > 1 ? 's' : ''} for this booking.`);
        return current;
      }

      setStatus(null);

      return {
        ...current,
        [roomId]: sanitizedQuantity,
      };
    });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[32px] bg-slate-200">
            <img
              src={hotel.images?.imgSource ?? hotel.Images?.[0]?.imgSource ?? '/assets/img/gallery/1.png'}
              alt={hotel.HotelName ?? 'Hotel'}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <Card className="rounded-[32px] p-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Hotel overview</p>
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">{hotel.HotelName}</h1>
              <p className="text-sm text-slate-500">Rating {hotel.Rating ?? 0}</p>
              <p className="text-base leading-7 text-slate-600">
                {hotel.Description ?? 'A thoughtfully designed stay with an experience optimized for clear comparison and fast booking.'}
              </p>
            </div>
          </Card>

          <div className="grid gap-5">
            {rooms.map((room) => {
              const roomId = String(room.RoomId ?? room.roomId ?? '');

              return (
                <Card key={roomId} className="rounded-[28px] p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold text-slate-900">{room.RoomType}</h2>
                      <p className="text-sm leading-6 text-slate-600">{room.Description}</p>
                      <p className="text-sm text-slate-500">Max guests: {room.MaxOccupancy ?? 0}</p>
                      <div className="flex flex-wrap gap-2">
                        {(room.RoomTags ?? []).map((tag) => (
                          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex min-w-[180px] flex-col gap-4 rounded-3xl bg-slate-50 p-4">
                      <div>
                        <p className="text-sm text-slate-500">Nightly rate</p>
                        <p className="text-2xl font-semibold text-slate-900">{formatCurrency(room.BaseRate ?? 0)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="secondary" onClick={() => updateQuantity(roomId, (selection[roomId] ?? 0) - 1)}>
                          -
                        </Button>
                        <span className="text-lg font-semibold text-slate-900">{selection[roomId] ?? 0}</span>
                        <Button variant="secondary" onClick={() => updateQuantity(roomId, (selection[roomId] ?? 0) + 1)}>
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="sticky top-28 h-fit rounded-[32px] p-6">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Booking summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Reserve selected rooms</h2>
            </div>
            <div className="space-y-2 text-sm leading-6 text-slate-600">
              <p>
                Stay window: <span className="font-medium text-slate-900">{bookingSearch.startDate || 'TBD'}</span> to{' '}
                <span className="font-medium text-slate-900">{bookingSearch.endDate || 'TBD'}</span>
              </p>
              <p>
                Guests: <span className="font-medium text-slate-900">{bookingSearch.adults}</span> adults,{' '}
                <span className="font-medium text-slate-900">{bookingSearch.children}</span> children
              </p>
              <p>
                Rooms selected: <span className="font-medium text-slate-900">{totalSelectedRooms}</span>
              </p>
              <p>
                Rooms requested: <span className="font-medium text-slate-900">{requestedRooms}</span>
              </p>
            </div>
            {status ? <p className="text-sm font-medium text-rose-600">{status}</p> : null}
            <Button
              fullWidth
              disabled={pending || totalSelectedRooms === 0 || !bookingSearch.startDate || !bookingSearch.endDate}
              onClick={() => {
                startBookingTransition(async () => {
                  setStatus(null);
                  const selectedRooms = Object.entries(selection)
                    .filter(([, quantity]) => quantity > 0)
                    .map(([roomId, quantity]) => ({
                      roomId,
                      quantity,
                    }));

                  try {
                    const bookingId = await createDraftBookingMutation.mutateAsync({
                      hotelId: hotel.HotelId ?? '',
                      booking: bookingSearch,
                      selectedRooms,
                    });
                    startTransition(() => {
                      navigate({
                        to: '/checkout/$bookingId',
                        params: { bookingId },
                      });
                    });
                  } catch (error) {
                    setStatus(error instanceof Error ? error.message : 'Unable to create booking');
                  }
                });
              }}
            >
              {pending || createDraftBookingMutation.isPending
                ? 'Creating booking...'
                : !bookingSearch.startDate || !bookingSearch.endDate
                  ? 'Choose dates to continue'
                  : 'Continue to checkout'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
