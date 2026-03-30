import type { PropsWithChildren } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { clearStoredSession } from '../session/session';
import { useSession } from '../session/use-session';
import { Button } from '../ui/button';
import { defaultBookingSearch } from '../../features/search/api/search-api';

interface PublicShellProps {
  compact?: boolean;
}

const links = [
  { label: 'Home', to: '/' as const },
  { label: 'Search', to: '/searchresult' as const, search: defaultBookingSearch },
  { label: 'Trips', to: '/bookings-trips' as const },
];

export function PublicShell({
  children,
  compact = false,
}: PropsWithChildren<PublicShellProps>) {
  const session = useSession();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
              BA
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Booking App</div>
              <div className="text-lg font-semibold text-slate-900">Modern hotel stays</div>
            </div>
          </Link>

          {!compact ? (
            <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 md:flex">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  search={item.search}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  activeProps={{
                    className: 'bg-slate-900 text-white hover:bg-slate-900 hover:text-white',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="flex items-center gap-3">
            {session?.role === 'manager' ? (
              <Button variant="secondary" onClick={() => navigate({ to: '/admin/managePage/dashboard' })}>
                Manager console
              </Button>
            ) : null}
            {session ? (
              <>
                <Link
                  to={session.role === 'manager' ? '/admin/managePage/dashboard' : '/profile'}
                  className="hidden text-sm font-medium text-slate-700 md:inline-flex"
                >
                  {String((session.profile.userName ?? session.profile.fullName) || 'My account')}
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    clearStoredSession();
                    navigate({ to: '/' });
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden text-sm font-medium text-slate-700 md:inline-flex">
                  Sign in
                </Link>
                <Button onClick={() => navigate({ to: '/register' })}>Create account</Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>

      {!compact ? (
        <footer className="border-t border-slate-200 bg-white/80">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Built for calm booking</p>
              <h2 className="max-w-xl text-2xl font-semibold text-slate-900">
                Faster search, cleaner checkout, and a more deliberate travel interface.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Designed for both desktop and mobile, the experience balances fast navigation with a more polished,
                welcoming visual rhythm.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="space-y-3">
                <p className="font-semibold text-slate-900">Explore</p>
                <Link to="/">Home</Link>
                <Link to="/searchresult" search={defaultBookingSearch}>Search results</Link>
                <Link to="/bookings-trips">Booking history</Link>
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-slate-900">Accounts</p>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/loginManager">Manager sign in</Link>
              </div>
            </div>
          </div>
        </footer>
      ) : null}
    </div>
  );
}
