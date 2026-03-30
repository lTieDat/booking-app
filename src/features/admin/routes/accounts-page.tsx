import { Card } from '../../../shared/ui/card';

export default function AccountsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Accounts</p>
        <h1 className="mt-2 text-3xl font-semibold">Account management placeholder</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          The page skeleton and route slot are ready for future staff or manager account controls without reworking the
          shell again.
        </p>
      </Card>
    </div>
  );
}
