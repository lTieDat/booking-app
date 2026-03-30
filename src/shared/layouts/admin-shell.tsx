import type { PropsWithChildren } from 'react';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { clearStoredSession } from '../session/session';
import { useSession } from '../session/use-session';
import { Button } from '../ui/button';

const adminLinks = [
  { label: 'Dashboard', to: '/admin/managePage/dashboard' as const },
  { label: 'Bookings', to: '/admin/managePage/manage-booking' as const },
  { label: 'Properties', to: '/admin/managePage/manage-properties' as const },
  { label: 'Reviews', to: '/admin/managePage/hotel-reviews' as const },
  { label: 'Accounts', to: '/admin/managePage/manage-account' as const },
  { label: 'Settings', to: '/admin/managePage/manage-settings' as const },
];

export function AdminShell({ children }: PropsWithChildren) {
  const session = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/95 px-5 py-6 lg:border-b-0 lg:border-r">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-200/70">Manager space</p>
              <h1 className="text-2xl font-semibold">Booking Console</h1>
              <p className="text-sm leading-6 text-slate-400">
                Operations, reservations and portfolio status in one place.
              </p>
            </div>
            <nav className="space-y-2">
              {adminLinks.map((item) => {
                const isActive = pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-white/10 bg-slate-900/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Operations</p>
                <h2 className="text-xl font-semibold text-white">
                  {String(session?.profile.fullName ?? 'Manager dashboard')}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={() => navigate({ to: '/' })}>
                  Back to site
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/5 text-white hover:bg-white/10"
                  onClick={() => {
                    clearStoredSession();
                    navigate({ to: '/loginManager' });
                  }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.16),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
