import { Outlet, useRouterState } from '@tanstack/react-router';
import { PublicShell } from '../shared/layouts/public-shell';

const compactRoutes = ['/login', '/register', '/forgot-password', '/verify'];

export default function RootShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <PublicShell compact={compactRoutes.some((route) => pathname.startsWith(route))}>
      <Outlet />
    </PublicShell>
  );
}
