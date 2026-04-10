import { Card } from '@booking/ui';
import { formatCurrency } from '@booking/shared';
import { useAdminAccountsPage } from '../hooks/use-admin-accounts-page';

export default function AccountsPage() {
  const { summary, managedProperties } = useAdminAccountsPage();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Accounts</p>
        <h1 className="mt-2 text-3xl font-semibold">Manager account and portfolio access</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Review the current manager scope, the portfolio attached to this session, and the core operational access
          available in the admin portal.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Manager', summary.managerName],
          ['Role', summary.role],
          ['Portfolio size', `${summary.propertyCount} properties`],
          ['Session age', summary.sessionAge],
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px] border-white/10 bg-white/5 p-5 text-white shadow-none">
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-3 text-xl font-semibold">{value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Access summary</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-white/5 p-4">
              <p className="text-sm text-slate-300">Managed rooms</p>
              <p className="mt-2 text-3xl font-semibold">{summary.totalRooms}</p>
            </div>
            <div className="rounded-[24px] bg-white/5 p-4">
              <p className="text-sm text-slate-300">Average property rating</p>
              <p className="mt-2 text-3xl font-semibold">{summary.averageRating.toFixed(1)}</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
            <p>Current manager scope includes {summary.scopedHotels.length} hotel ids attached to the active session.</p>
            <p>Operational access covers dashboard analytics, booking operations, property detail inspection, and workspace configuration.</p>
            <p>Authentication remains manager-scoped and isolated from the customer-facing user portal.</p>
          </div>
        </Card>

        <Card className="rounded-[32px] border-white/10 bg-white/5 p-6 text-white shadow-none">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Managed properties</p>
          <div className="mt-6 grid gap-4">
            {managedProperties.map((property) => (
              <div key={property.id} className="rounded-[24px] bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{property.name}</p>
                    <p className="text-sm text-slate-300">
                      {property.city}, {property.country}
                    </p>
                  </div>
                  <div className="text-right text-sm text-slate-300">
                    <p>Rating {property.rating.toFixed(1)}</p>
                    <p>{property.roomCount} rooms</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <span className="text-slate-400">Portfolio revenue</span>
                  <span className="font-semibold text-white">{formatCurrency(property.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
