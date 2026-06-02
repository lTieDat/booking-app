import { createRootRoute, createRoute, createRouter, lazyRouteComponent, redirect } from '@tanstack/react-router';
import RootShell from './root-shell';
import { PageSkeleton } from '@booking/ui';
import { queryClient, requireSession } from '@booking/shared';
import { RouterErrorBoundary, RouterNotFound } from './router-boundaries';
import { getDashboardQuery } from '../features/admin/api/dashboard-api';
import { getFrontDeskQuery, getManageBookingsQuery } from '../features/admin/api/manage-bookings-api';
import { getManagePropertiesQuery, getPropertyDetailQuery } from '../features/admin/api/manage-properties-api';
import { readStoredAdminSettings } from '../features/admin/lib/admin-settings-storage';

const rootRoute = createRootRoute({
  component: RootShell,
  errorComponent: RouterErrorBoundary,
  notFoundComponent: RouterNotFound,
});

const managerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/loginManager',
  component: lazyRouteComponent(() => import('../features/auth/routes/manager-login-page')),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage',
  beforeLoad: () => {
    requireSession('manager');
    throw redirect({ to: readStoredAdminSettings().defaultLanding });
  },
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/dashboard',
  beforeLoad: () => requireSession('manager'),
  loader: () => queryClient.ensureQueryData(getDashboardQuery()),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/dashboard-page')),
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-booking',
  beforeLoad: () => requireSession('manager'),
  loader: () => queryClient.ensureQueryData(getManageBookingsQuery()),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/manage-bookings-page')),
});

const adminFrontDeskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/front-desk',
  beforeLoad: () => requireSession(),
  loader: () => queryClient.ensureQueryData(getFrontDeskQuery()),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/front-desk-page')),
});

const adminPropertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-properties',
  beforeLoad: () => requireSession('manager'),
  loader: () => queryClient.ensureQueryData(getManagePropertiesQuery()),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/manage-properties-page')),
});

const adminPropertyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-properties/$hotelId',
  beforeLoad: () => requireSession('manager'),
  loader: ({ params }) => queryClient.ensureQueryData(getPropertyDetailQuery(params.hotelId)),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/property-detail-page')),
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/hotel-reviews',
  beforeLoad: () => requireSession('manager'),
  loader: async () => {
    await Promise.all([
      queryClient.ensureQueryData(getManageBookingsQuery()),
      queryClient.ensureQueryData(getManagePropertiesQuery()),
    ]);
  },
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/reviews-page')),
});

const adminAccountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-account',
  beforeLoad: () => requireSession('manager'),
  loader: async () => {
    await Promise.all([
      queryClient.ensureQueryData(getDashboardQuery()),
      queryClient.ensureQueryData(getManagePropertiesQuery()),
    ]);
  },
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/admin/routes/accounts-page')),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-settings',
  beforeLoad: () => requireSession('manager'),
  component: lazyRouteComponent(() => import('../features/admin/routes/settings-page')),
});

const routeTree = rootRoute.addChildren([
  managerLoginRoute,
  adminIndexRoute,
  adminDashboardRoute,
  adminBookingsRoute,
  adminFrontDeskRoute,
  adminPropertiesRoute,
  adminPropertyDetailRoute,
  adminReviewsRoute,
  adminAccountsRoute,
  adminSettingsRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingMs: 150,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
