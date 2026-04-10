import { Outlet } from '@tanstack/react-router';
import { AdminShell } from '../shared/layouts/admin-shell';

export default function RootShell() {
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
