import { useNavigate } from '@tanstack/react-router';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getDeleteHotelMutation, getManagePropertiesQuery, getSaveHotelMutation } from '../api/manage-properties-api';
import { Card } from '@booking/ui';
import { EmptyState } from '@booking/ui';
import { Button, Field, Input, Textarea } from '@booking/ui';
import { formatCurrency, queryClient } from '@booking/shared';

export default function ManagePropertiesPage() {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(getManagePropertiesQuery());
  const { hotels } = data;
  const saveHotel = useMutation(getSaveHotelMutation());
  const deleteHotel = useMutation(getDeleteHotelMutation());
  const [form, setForm] = useState({
    name: '',
    description: '',
    country: 'Vietnam',
    city: '',
    detail: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admin', 'properties'] });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Property management</p>
        <h1 className="mt-2 text-3xl font-semibold">Portfolio snapshot</h1>
      </Card>

      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Create hotel</p>
        <form
          className="mt-5 grid gap-4 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              setStatus(null);
              await saveHotel.mutateAsync({
                data: {
                  name: form.name,
                  description: form.description,
                  location: {
                    country: form.country,
                    city: form.city,
                    detail: form.detail,
                  },
                },
              });
              setForm({ name: '', description: '', country: 'Vietnam', city: '', detail: '' });
              await refresh();
              setStatus('Hotel created.');
            } catch (error) {
              setStatus(error instanceof Error ? error.message : 'Unable to save hotel');
            }
          }}
        >
          <Field label="Name">
            <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          </Field>
          <Field label="City">
            <Input value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
          </Field>
          <Field label="Country">
            <Input value={form.country} onChange={(event) => setForm((current) => ({ ...current, country: event.target.value }))} />
          </Field>
          <Field label="Address detail">
            <Input value={form.detail} onChange={(event) => setForm((current) => ({ ...current, detail: event.target.value }))} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <Textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              />
            </Field>
          </div>
          {status ? <p className="text-sm font-medium text-teal-200 md:col-span-2">{status}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" disabled={!form.name || !form.city || saveHotel.isPending}>
              {saveHotel.isPending ? 'Saving...' : 'Add hotel'}
            </Button>
          </div>
        </form>
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
                  <div className="grid gap-2">
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
                    <Button
                      variant="danger"
                      className="w-full"
                      disabled={deleteHotel.isPending}
                      onClick={async () => {
                        if (!hotel.HotelId) return;
                        await deleteHotel.mutateAsync(hotel.HotelId);
                        await refresh();
                      }}
                    >
                      Delete hotel
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
