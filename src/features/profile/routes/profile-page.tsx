import { useLoaderData } from '@tanstack/react-router';
import { useProfilePage } from '../hooks/use-profile-page';
import { Button } from '../../../shared/ui/button';
import { Card } from '../../../shared/ui/card';
import { Field } from '../../../shared/ui/field';
import { Input } from '../../../shared/ui/input';
import type { UserProfile } from '../../../shared/types/domain';

export default function ProfilePage() {
  const { user } = useLoaderData({ from: '/profile' }) as { user: UserProfile };
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    status,
    submit,
  } = useProfilePage(user);

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <Card className="rounded-[32px] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Account overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          {user.fullName ?? user.userName ?? 'Profile'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Manage your core account details from one consistent, validated profile surface.
        </p>
      </Card>

      <form onSubmit={submit}>
        <Card className="rounded-[32px] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" error={errors.fullName?.message}>
              <Input {...register('fullName')} />
            </Field>
            <Field label="Display name" error={errors.userName?.message}>
              <Input {...register('userName')} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" {...register('email')} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <Input {...register('phone')} />
            </Field>
            <Field label="Date of birth" error={errors.dateOfBirth?.message}>
              <Input type="date" {...register('dateOfBirth')} />
            </Field>
            <Field label="Address" error={errors.address?.message}>
              <Input {...register('address')} />
            </Field>
          </div>

          {status ? <p className="mt-5 text-sm font-medium text-slate-700">{status}</p> : null}

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save profile'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
