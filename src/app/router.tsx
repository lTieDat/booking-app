import { createRootRoute, createRoute, createRouter, lazyRouteComponent, redirect } from '@tanstack/react-router';
import RootShell from './root-shell';
import { PageSkeleton } from '../shared/ui/page-skeleton';
import { requireSession } from '../shared/routes/guards';
import { RouterErrorBoundary, RouterNotFound } from './router-boundaries';
import { getHotelDetailQuery, validateHotelDetailSearch } from '../features/hotels/api/hotels-api';
import { getSearchResultsQuery, validateSearchParams } from '../features/search/api/search-api';
import { getCheckoutQuery } from '../features/bookings/api/bookings-api';
import { getBookingHistoryQuery } from '../features/bookings/api/history-api';
import { getProfileQuery } from '../features/profile/api/profile-api';
import { getDashboardQuery } from '../features/admin/api/dashboard-api';
import { getManageBookingsQuery } from '../features/admin/api/manage-bookings-api';
import { getManagePropertiesQuery, getPropertyDetailQuery } from '../features/admin/api/manage-properties-api';
import { queryClient } from '../shared/query/query-client';

const rootRoute = createRootRoute({
  component: RootShell,
  errorComponent: RouterErrorBoundary,
  notFoundComponent: RouterNotFound,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('../features/home/routes/home-page')),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: lazyRouteComponent(() => import('../features/auth/routes/login-page')),
});

const managerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/loginManager',
  component: lazyRouteComponent(() => import('../features/auth/routes/manager-login-page')),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: lazyRouteComponent(() => import('../features/auth/routes/register-page')),
});

const verifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verify',
  validateSearch: (search: Record<string, unknown>) => ({
    email: String(search.email ?? ''),
  }),
  component: lazyRouteComponent(() => import('../features/auth/routes/verify-page')),
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/forgot-password',
  component: lazyRouteComponent(() => import('../features/auth/routes/forgot-password-page')),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/searchresult',
  validateSearch: validateSearchParams,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => queryClient.ensureQueryData(getSearchResultsQuery(deps)),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/search/routes/search-results-page')),
});

const hotelDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/hotelDetail/$hotelId',
  validateSearch: validateHotelDetailSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) => queryClient.ensureQueryData(getHotelDetailQuery(params.hotelId, deps)),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/hotels/routes/hotel-detail-page')),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout/$bookingId',
  loader: ({ params }) => queryClient.ensureQueryData(getCheckoutQuery(params.bookingId)),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/bookings/routes/checkout-page')),
});

const finalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking/$bookingId/final',
  component: lazyRouteComponent(() => import('../features/bookings/routes/final-page')),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  beforeLoad: () => requireSession('user'),
  loader: () => queryClient.ensureQueryData(getProfileQuery()),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/profile/routes/profile-page')),
});

const bookingHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bookings-trips',
  beforeLoad: () => requireSession('user'),
  loader: () => queryClient.ensureQueryData(getBookingHistoryQuery()),
  pendingComponent: PageSkeleton,
  component: lazyRouteComponent(() => import('../features/bookings/routes/booking-history-page')),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage',
  beforeLoad: () => {
    requireSession('manager');
    throw redirect({ to: '/admin/managePage/dashboard' });
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
  component: lazyRouteComponent(() => import('../features/admin/routes/reviews-page')),
});

const adminAccountsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-account',
  beforeLoad: () => requireSession('manager'),
  component: lazyRouteComponent(() => import('../features/admin/routes/accounts-page')),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/managePage/manage-settings',
  beforeLoad: () => requireSession('manager'),
  component: lazyRouteComponent(() => import('../features/admin/routes/settings-page')),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  managerLoginRoute,
  registerRoute,
  verifyRoute,
  forgotPasswordRoute,
  searchRoute,
  hotelDetailRoute,
  checkoutRoute,
  finalRoute,
  profileRoute,
  bookingHistoryRoute,
  adminIndexRoute,
  adminDashboardRoute,
  adminBookingsRoute,
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
