import { Card } from '../../../shared/ui/card';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold">Settings placeholder</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          This route is intentionally simple for now, but the new feature-based structure makes it straightforward to
          split settings into smaller modules later.
        </p>
      </Card>
    </div>
  );
}
