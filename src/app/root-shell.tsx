import { Outlet, useRouterState } from '@tanstack/react-router';
import { AdminShell } from '../shared/layouts/admin-shell';
import { PublicShell } from '../shared/layouts/public-shell';

const compactRoutes = ['/login', '/loginManager', '/register', '/forgot-password', '/verify'];

export default function RootShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname.startsWith('/admin/managePage')) {
    return (
      <AdminShell>
        <Outlet />
      </AdminShell>
    );
  }

  return (
    <PublicShell compact={compactRoutes.some((route) => pathname.startsWith(route))}>
      <Outlet />
    </PublicShell>
  );
}
