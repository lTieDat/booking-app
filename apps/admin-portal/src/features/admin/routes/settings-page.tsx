import { useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Button, Card, Field, Input, Select, Textarea } from '@booking/ui';
import { queryClient } from '@booking/shared';
import {
  getAssignReceptionistMutation,
  getBookingConfigQuery,
  getSaveCancellationPolicyMutation,
  getSaveDiscountMutation,
  getSaveTaxConfigMutation,
} from '../api/manage-properties-api';
import { useAdminSettings } from '../hooks/use-admin-settings';

export default function SettingsPage() {
  const { data: config } = useSuspenseQuery(getBookingConfigQuery());
  const saveDiscount = useMutation(getSaveDiscountMutation());
  const savePolicy = useMutation(getSaveCancellationPolicyMutation());
  const saveTax = useMutation(getSaveTaxConfigMutation());
  const assignReceptionist = useMutation(getAssignReceptionistMutation());
  const [discount, setDiscount] = useState({
    code: '',
    name: '',
    discountType: 'PERCENTAGE' as 'FIXED_AMOUNT' | 'PERCENTAGE',
    discountValue: 10,
    startDate: '',
    endDate: '',
  });
  const [policy, setPolicy] = useState({
    hotelId: '',
    name: '',
    description: '',
    freeCancellationHours: 24,
    penaltyType: 'NONE' as 'NONE' | 'FIXED_AMOUNT' | 'PERCENTAGE',
    penaltyValue: 0,
  });
  const [tax, setTax] = useState({
    hotelId: '',
    name: '',
    applyType: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_PER_BOOKING' | 'PER_ROOM_PER_NIGHT',
    rate: 10,
    amountMinor: 0,
  });
  const [assignment, setAssignment] = useState({
    userId: '',
    hotelId: '',
  });
  const [remoteStatus, setRemoteStatus] = useState<string | null>(null);
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    preview,
    status,
    submit,
    resetToDefaults,
  } = useAdminSettings();

  const refreshConfig = () => queryClient.invalidateQueries({ queryKey: ['admin', 'booking-config'] });

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <form className="space-y-6" onSubmit={submit}>
        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold">Workspace preferences</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Save manager-specific preferences for this device, including dashboard defaults, alert thresholds, and how
            the workspace should behave during daily operations.
          </p>
        </Card>

        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Default landing page" error={errors.defaultLanding?.message}>
              <Select
                {...register('defaultLanding')}
                className="border-white/10 bg-slate-950/40 text-white focus:border-teal-400 focus:ring-teal-500/20"
              >
                <option value="/admin/managePage/dashboard">Dashboard</option>
                <option value="/admin/managePage/manage-booking">Bookings</option>
                <option value="/admin/managePage/manage-properties">Properties</option>
              </Select>
            </Field>
            <Field label="Revenue view" error={errors.revenueView?.message}>
              <Select
                {...register('revenueView')}
                className="border-white/10 bg-slate-950/40 text-white focus:border-teal-400 focus:ring-teal-500/20"
              >
                <option value="portfolio">Portfolio</option>
                <option value="gross">Gross totals</option>
              </Select>
            </Field>
            <Field label="Bookings per page" error={errors.bookingsPerPage?.message}>
              <Input
                type="number"
                {...register('bookingsPerPage', { valueAsNumber: true })}
                className="border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-teal-500/20"
              />
            </Field>
            <Field label="Auto refresh (minutes)" error={errors.autoRefreshMinutes?.message}>
              <Input
                type="number"
                {...register('autoRefreshMinutes', { valueAsNumber: true })}
                className="border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-teal-500/20"
              />
            </Field>
            <Field label="Low-rating alert threshold" error={errors.lowRatingThreshold?.message}>
              <Input
                type="number"
                {...register('lowRatingThreshold', { valueAsNumber: true })}
                className="border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-teal-500/20"
              />
            </Field>
            <div className="grid gap-3 rounded-[24px] bg-white/5 p-4 text-sm text-slate-200">
              {[
                ['compactTables', 'Use denser table and list spacing'],
                ['emailDigest', 'Enable daily email digest reminders'],
                ['lowRatingAlerts', 'Highlight low-rating guest feedback'],
              ].map(([field, label]) => (
                <label key={field} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    {...register(field as 'compactTables' | 'emailDigest' | 'lowRatingAlerts')}
                    className="h-4 w-4 rounded border border-white/20 bg-slate-950/40 text-teal-400 focus:ring-teal-400"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Field label="Workspace notes" error={errors.notes?.message} hint="Useful for local reminders only.">
              <Textarea
                {...register('notes')}
                className="border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus:border-teal-400 focus:ring-teal-500/20"
              />
            </Field>
          </div>

          {status ? <p className="mt-5 text-sm font-medium text-teal-200">{status}</p> : null}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              className="bg-white/5 text-white ring-white/10 hover:bg-white/10"
              onClick={resetToDefaults}
            >
              Reset defaults
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save preferences'}
            </Button>
          </div>
        </Card>
      </form>

      <Card className="h-fit rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Preview</p>
        <div className="mt-6 grid gap-4">
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Landing page</p>
            <p className="mt-2 text-lg font-semibold">{preview.defaultLanding?.split('/').at(-1) ?? 'dashboard'}</p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Bookings per page</p>
            <p className="mt-2 text-lg font-semibold">{preview.bookingsPerPage ?? 8}</p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Auto refresh cadence</p>
            <p className="mt-2 text-lg font-semibold">
              {preview.autoRefreshMinutes ? `${preview.autoRefreshMinutes} minutes` : 'Manual refresh only'}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Alerting mode</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              Low-rating alerts are {preview.lowRatingAlerts ? 'enabled' : 'disabled'} and the threshold is{' '}
              {preview.lowRatingThreshold ?? 3} stars or below.
            </p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Operator note</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {preview.notes?.trim() || 'No local note saved for this workspace yet.'}
            </p>
          </div>
        </div>
      </Card>

      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none lg:col-span-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Spring Boot booking config</p>
        <h2 className="mt-2 text-3xl font-semibold">Discounts, policies, taxes, and front-desk access</h2>
        {remoteStatus ? <p className="mt-4 text-sm font-medium text-teal-200">{remoteStatus}</p> : null}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Discounts</p>
            <p className="mt-2 text-3xl font-semibold">{config.discounts.totalElements ?? config.discounts.content?.length ?? 0}</p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Cancellation policies</p>
            <p className="mt-2 text-3xl font-semibold">
              {config.cancellationPolicies.totalElements ?? config.cancellationPolicies.content?.length ?? 0}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Tax configs</p>
            <p className="mt-2 text-3xl font-semibold">{config.taxConfigs.length ?? 0}</p>
          </div>
          <div className="rounded-[24px] bg-white/5 p-4">
            <p className="text-sm text-slate-300">Assignments</p>
            <p className="mt-2 text-3xl font-semibold">{config.assignments.totalElements ?? config.assignments.content?.length ?? 0}</p>
          </div>
        </div>
      </Card>

      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            className="grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await saveDiscount.mutateAsync({
                data: {
                  ...discount,
                  startDate: toApiDate(discount.startDate),
                  endDate: toApiDate(discount.endDate),
                  active: true,
                },
              });
              await refreshConfig();
              setRemoteStatus('Discount saved.');
            }}
          >
            <h3 className="text-xl font-semibold">Create discount</h3>
            <Input placeholder="Code" value={discount.code} onChange={(event) => setDiscount((current) => ({ ...current, code: event.target.value }))} />
            <Input placeholder="Name" value={discount.name} onChange={(event) => setDiscount((current) => ({ ...current, name: event.target.value }))} />
            <Select value={discount.discountType} onChange={(event) => setDiscount((current) => ({ ...current, discountType: event.target.value as 'FIXED_AMOUNT' | 'PERCENTAGE' }))}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED_AMOUNT">Fixed amount</option>
            </Select>
            <Input type="number" value={discount.discountValue} onChange={(event) => setDiscount((current) => ({ ...current, discountValue: Number(event.target.value) }))} />
            <Input type="datetime-local" value={discount.startDate} onChange={(event) => setDiscount((current) => ({ ...current, startDate: event.target.value }))} />
            <Input type="datetime-local" value={discount.endDate} onChange={(event) => setDiscount((current) => ({ ...current, endDate: event.target.value }))} />
            <Button type="submit" disabled={!discount.code || !discount.name || !discount.startDate || !discount.endDate}>Save discount</Button>
          </form>

          <form
            className="grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await savePolicy.mutateAsync({
                data: {
                  ...policy,
                  hotelId: policy.hotelId || undefined,
                  active: true,
                },
              });
              await refreshConfig();
              setRemoteStatus('Cancellation policy saved.');
            }}
          >
            <h3 className="text-xl font-semibold">Create cancellation policy</h3>
            <Select value={policy.hotelId} onChange={(event) => setPolicy((current) => ({ ...current, hotelId: event.target.value }))}>
              <option value="">Global policy</option>
              {config.hotels.map((hotel) => (
                <option key={hotel.HotelId ?? hotel.id} value={hotel.HotelId ?? hotel.id}>
                  {hotel.HotelName}
                </option>
              ))}
            </Select>
            <Input placeholder="Name" value={policy.name} onChange={(event) => setPolicy((current) => ({ ...current, name: event.target.value }))} />
            <Input placeholder="Description" value={policy.description} onChange={(event) => setPolicy((current) => ({ ...current, description: event.target.value }))} />
            <Input type="number" value={policy.freeCancellationHours} onChange={(event) => setPolicy((current) => ({ ...current, freeCancellationHours: Number(event.target.value) }))} />
            <Select value={policy.penaltyType} onChange={(event) => setPolicy((current) => ({ ...current, penaltyType: event.target.value as 'NONE' | 'FIXED_AMOUNT' | 'PERCENTAGE' }))}>
              <option value="NONE">No penalty</option>
              <option value="FIXED_AMOUNT">Fixed amount</option>
              <option value="PERCENTAGE">Percentage</option>
            </Select>
            <Input type="number" value={policy.penaltyValue} onChange={(event) => setPolicy((current) => ({ ...current, penaltyValue: Number(event.target.value) }))} />
            <Button type="submit" disabled={!policy.name}>Save policy</Button>
          </form>

          <form
            className="grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await saveTax.mutateAsync({
                data: {
                  ...tax,
                  hotelId: tax.hotelId || undefined,
                  active: true,
                  inclusive: false,
                },
              });
              await refreshConfig();
              setRemoteStatus('Tax config saved.');
            }}
          >
            <h3 className="text-xl font-semibold">Create tax config</h3>
            <Select value={tax.hotelId} onChange={(event) => setTax((current) => ({ ...current, hotelId: event.target.value }))}>
              <option value="">Global tax</option>
              {config.hotels.map((hotel) => (
                <option key={hotel.HotelId ?? hotel.id} value={hotel.HotelId ?? hotel.id}>
                  {hotel.HotelName}
                </option>
              ))}
            </Select>
            <Input placeholder="Name" value={tax.name} onChange={(event) => setTax((current) => ({ ...current, name: event.target.value }))} />
            <Select value={tax.applyType} onChange={(event) => setTax((current) => ({ ...current, applyType: event.target.value as 'PERCENTAGE' | 'FIXED_PER_BOOKING' | 'PER_ROOM_PER_NIGHT' }))}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED_PER_BOOKING">Fixed per booking</option>
              <option value="PER_ROOM_PER_NIGHT">Per room per night</option>
            </Select>
            <Input type="number" value={tax.rate} onChange={(event) => setTax((current) => ({ ...current, rate: Number(event.target.value) }))} />
            <Input type="number" value={tax.amountMinor} onChange={(event) => setTax((current) => ({ ...current, amountMinor: Number(event.target.value) }))} />
            <Button type="submit" disabled={!tax.name}>Save tax</Button>
          </form>

          <form
            className="grid gap-3"
            onSubmit={async (event) => {
              event.preventDefault();
              await assignReceptionist.mutateAsync({
                userId: assignment.userId,
                hotelId: assignment.hotelId,
                active: true,
              });
              await refreshConfig();
              setRemoteStatus('Receptionist assigned.');
            }}
          >
            <h3 className="text-xl font-semibold">Assign receptionist</h3>
            <Input placeholder="User UUID" value={assignment.userId} onChange={(event) => setAssignment((current) => ({ ...current, userId: event.target.value }))} />
            <Select value={assignment.hotelId} onChange={(event) => setAssignment((current) => ({ ...current, hotelId: event.target.value }))}>
              <option value="">Select hotel</option>
              {config.hotels.map((hotel) => (
                <option key={hotel.HotelId ?? hotel.id} value={hotel.HotelId ?? hotel.id}>
                  {hotel.HotelName}
                </option>
              ))}
            </Select>
            <Button type="submit" disabled={!assignment.userId || !assignment.hotelId}>Assign</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

function toApiDate(value: string) {
  return value ? new Date(value).toISOString() : new Date().toISOString();
}
