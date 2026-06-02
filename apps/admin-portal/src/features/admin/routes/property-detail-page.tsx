import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import {
  getPropertyDetailQuery,
  getSaveAmenityMutation,
  getSaveHotelMutation,
  getSaveRoomMutation,
  getSaveRoomTypeMutation,
  getUploadPreviewImageMutation,
} from '../api/manage-properties-api';
import { Card } from '@booking/ui';
import { Button } from '@booking/ui';
import { Field, Input, Select, Textarea } from '@booking/ui';
import { formatCurrency, queryClient } from '@booking/shared';

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
  const { hotel, statistics, roomTypes, rooms: physicalRooms } = data;
  const saveHotel = useMutation(getSaveHotelMutation());
  const uploadPreview = useMutation(getUploadPreviewImageMutation());
  const saveRoomType = useMutation(getSaveRoomTypeMutation());
  const saveRoom = useMutation(getSaveRoomMutation());
  const saveAmenity = useMutation(getSaveAmenityMutation());
  const [status, setStatus] = useState<string | null>(null);
  const [hotelForm, setHotelForm] = useState({
    name: hotel.HotelName ?? '',
    description: hotel.Description ?? '',
    country: hotel.Address?.Country ?? '',
    city: hotel.Address?.City ?? '',
    detail: hotel.Address?.StreetAddress ?? '',
  });
  const [roomTypeForm, setRoomTypeForm] = useState({
    name: '',
    code: '',
    maxAdults: 2,
    maxChildren: 0,
    maxOccupancy: 2,
    bedType: 'DOUBLE' as 'DOUBLE' | 'SINGLE',
    basePrice: 0,
    description: '',
  });
  const [roomForm, setRoomForm] = useState({
    roomTypeId: '',
    roomNumber: '',
    floor: 1,
    status: 'AVAILABLE' as const,
  });
  const [amenityForm, setAmenityForm] = useState({
    roomTypeId: '',
    name: '',
    description: '',
    quantity: 1,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admin', 'properties', 'detail', hotelId] });

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

      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Edit property</p>
        <form
          className="mt-5 grid gap-4 md:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              setStatus(null);
              await saveHotel.mutateAsync({
                id: hotelId,
                data: {
                  name: hotelForm.name,
                  description: hotelForm.description,
                  location: {
                    country: hotelForm.country,
                    city: hotelForm.city,
                    detail: hotelForm.detail,
                  },
                },
              });
              await refresh();
              setStatus('Property updated.');
            } catch (error) {
              setStatus(error instanceof Error ? error.message : 'Unable to update property');
            }
          }}
        >
          <Field label="Name">
            <Input value={hotelForm.name} onChange={(event) => setHotelForm((current) => ({ ...current, name: event.target.value }))} />
          </Field>
          <Field label="City">
            <Input value={hotelForm.city} onChange={(event) => setHotelForm((current) => ({ ...current, city: event.target.value }))} />
          </Field>
          <Field label="Country">
            <Input value={hotelForm.country} onChange={(event) => setHotelForm((current) => ({ ...current, country: event.target.value }))} />
          </Field>
          <Field label="Address detail">
            <Input value={hotelForm.detail} onChange={(event) => setHotelForm((current) => ({ ...current, detail: event.target.value }))} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <Textarea
                value={hotelForm.description}
                onChange={(event) => setHotelForm((current) => ({ ...current, description: event.target.value }))}
              />
            </Field>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            <Button type="submit" disabled={saveHotel.isPending}>Save property</Button>
            <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50">
              Upload preview
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  await uploadPreview.mutateAsync({ hotelId, file, altText: `${hotelForm.name} preview` });
                  await refresh();
                }}
              />
            </label>
          </div>
          {status ? <p className="text-sm font-medium text-teal-200 md:col-span-2">{status}</p> : null}
        </form>
      </Card>

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
            {(roomTypes ?? []).map((room) => (
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Room type</p>
          <form
            className="mt-5 grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await saveRoomType.mutateAsync({
                hotelId,
                data: {
                  ...roomTypeForm,
                  isActive: true,
                },
              });
              setRoomTypeForm({ name: '', code: '', maxAdults: 2, maxChildren: 0, maxOccupancy: 2, bedType: 'DOUBLE', basePrice: 0, description: '' });
              await refresh();
            }}
          >
            <Input placeholder="Name" value={roomTypeForm.name} onChange={(event) => setRoomTypeForm((current) => ({ ...current, name: event.target.value }))} />
            <Input placeholder="Code" value={roomTypeForm.code} onChange={(event) => setRoomTypeForm((current) => ({ ...current, code: event.target.value }))} />
            <Input type="number" placeholder="Base price" value={roomTypeForm.basePrice} onChange={(event) => setRoomTypeForm((current) => ({ ...current, basePrice: Number(event.target.value) }))} />
            <Select value={roomTypeForm.bedType} onChange={(event) => setRoomTypeForm((current) => ({ ...current, bedType: event.target.value as 'DOUBLE' | 'SINGLE' }))}>
              <option value="DOUBLE">Double</option>
              <option value="SINGLE">Single</option>
            </Select>
            <Button type="submit" disabled={!roomTypeForm.name || !roomTypeForm.code}>Add room type</Button>
          </form>
        </Card>

        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Physical room</p>
          <form
            className="mt-5 grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await saveRoom.mutateAsync({
                hotelId,
                data: {
                  roomTypeId: roomForm.roomTypeId,
                  roomNumber: roomForm.roomNumber,
                  floor: roomForm.floor,
                  status: roomForm.status,
                  isActive: true,
                },
              });
              setRoomForm({ roomTypeId: '', roomNumber: '', floor: 1, status: 'AVAILABLE' });
              await refresh();
            }}
          >
            <Select value={roomForm.roomTypeId} onChange={(event) => setRoomForm((current) => ({ ...current, roomTypeId: event.target.value }))}>
              <option value="">Select room type</option>
              {roomTypes.map((roomType) => (
                <option key={String(roomType.roomTypeId ?? roomType.roomId)} value={String(roomType.roomTypeId ?? roomType.roomId)}>
                  {roomType.RoomType}
                </option>
              ))}
            </Select>
            <Input placeholder="Room number" value={roomForm.roomNumber} onChange={(event) => setRoomForm((current) => ({ ...current, roomNumber: event.target.value }))} />
            <Input type="number" placeholder="Floor" value={roomForm.floor} onChange={(event) => setRoomForm((current) => ({ ...current, floor: Number(event.target.value) }))} />
            <Button type="submit" disabled={!roomForm.roomTypeId || !roomForm.roomNumber}>Add room</Button>
          </form>
          <p className="mt-4 text-sm text-slate-300">{physicalRooms.length} physical rooms loaded.</p>
        </Card>

        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Amenity</p>
          <form
            className="mt-5 grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await saveAmenity.mutateAsync({
                hotelId,
                roomTypeId: amenityForm.roomTypeId,
                data: {
                  name: amenityForm.name,
                  description: amenityForm.description,
                  quantity: amenityForm.quantity,
                  isActive: true,
                },
              });
              setAmenityForm({ roomTypeId: '', name: '', description: '', quantity: 1 });
              await refresh();
            }}
          >
            <Select value={amenityForm.roomTypeId} onChange={(event) => setAmenityForm((current) => ({ ...current, roomTypeId: event.target.value }))}>
              <option value="">Select room type</option>
              {roomTypes.map((roomType) => (
                <option key={String(roomType.roomTypeId ?? roomType.roomId)} value={String(roomType.roomTypeId ?? roomType.roomId)}>
                  {roomType.RoomType}
                </option>
              ))}
            </Select>
            <Input placeholder="Amenity name" value={amenityForm.name} onChange={(event) => setAmenityForm((current) => ({ ...current, name: event.target.value }))} />
            <Input placeholder="Description" value={amenityForm.description} onChange={(event) => setAmenityForm((current) => ({ ...current, description: event.target.value }))} />
            <Input type="number" value={amenityForm.quantity} onChange={(event) => setAmenityForm((current) => ({ ...current, quantity: Number(event.target.value) }))} />
            <Button type="submit" disabled={!amenityForm.roomTypeId || !amenityForm.name}>Add amenity</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
