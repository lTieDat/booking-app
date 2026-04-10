import { Button, Card, Field, Input, Select, Textarea } from '@booking/ui';
import { useAdminSettings } from '../hooks/use-admin-settings';

export default function SettingsPage() {
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
    </div>
  );
}
