import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { arrivalTimeOptions, type CheckoutFormValues } from '../dto/checkout-form.dto';
import { Card } from '@booking/ui';
import { Field } from '@booking/ui';
import { Input } from '@booking/ui';
import { Select } from '@booking/ui';
import { Textarea } from '@booking/ui';
import type { PrefixOption } from '@booking/shared';

interface CheckoutGuestFormCardProps {
  register: UseFormRegister<CheckoutFormValues>;
  errors: FieldErrors<CheckoutFormValues>;
  prefixes: PrefixOption[];
  status: string | null;
}

const addOnOptions = [
  ['airportShuttle', "I'm interested in an airport shuttle"],
  ['rentalCar', 'Show rental car offers'],
  ['taxiShuttle', 'Show taxi or shuttle options'],
] as const;

export function CheckoutGuestFormCard({
  register,
  errors,
  prefixes,
  status,
}: CheckoutGuestFormCardProps) {
  return (
    <Card className="rounded-[32px] p-6">
      <div className="mb-5 space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Guest details</p>
        <h2 className="text-2xl font-semibold text-slate-900">Finish your reservation</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" error={errors.customerName?.message}>
          <Input placeholder="Le Tien Dat" {...register('customerName')} />
        </Field>
        <Field label="Email" error={errors.customerEmail?.message}>
          <Input type="email" placeholder="guest@example.com" {...register('customerEmail')} />
        </Field>
        <Field label="Country" error={errors.country?.message}>
          <Select {...register('country')}>
            <option value="">Select a country</option>
            {prefixes.map((prefix) => (
              <option key={prefix.code} value={prefix.name}>
                {prefix.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Arrival time" error={errors.arrivalTime?.message}>
          <Select {...register('arrivalTime')}>
            {arrivalTimeOptions.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Phone prefix" error={errors.phonePrefix?.message}>
          <Select {...register('phonePrefix')}>
            {prefixes.map((prefix) => (
              <option key={prefix.code} value={prefix.dial_code}>
                {prefix.name} {prefix.dial_code}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Phone number" error={errors.phoneNo?.message}>
          <Input placeholder="123456789" {...register('phoneNo')} />
        </Field>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {addOnOptions.map(([name, label]) => (
          <label key={name} className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <input type="checkbox" className="mt-1" {...register(name)} />
            <span className="text-sm leading-6 text-slate-700">{label}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <Field
          label="Special requests"
          hint="Optional and subject to availability"
          error={errors.specialRequest?.message}
        >
          <Textarea {...register('specialRequest')} />
        </Field>
      </div>

      {status ? <p className="mt-4 text-sm font-medium text-rose-600">{status}</p> : null}
    </Card>
  );
}
