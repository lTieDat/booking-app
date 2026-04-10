import { createRootRoute, createRoute, createRouter, lazyRouteComponent, redirect } from '@tanstack/react-router';
import RootShell from './root-shell';
import { PageSkeleton } from '@booking/ui';
import { queryClient, requireSession } from '@booking/shared';
import { RouterErrorBoundary, RouterNotFound } from './router-boundaries';
import { getHotelDetailQuery, validateHotelDetailSearch } from '../features/hotels/api/hotels-api';
import { getSearchResultsQuery, validateSearchParams } from '../features/search/api/search-api';
import { getCheckoutQuery } from '../features/bookings/api/bookings-api';
import { getBookingHistoryQuery } from '../features/bookings/api/history-api';
import { getProfileQuery } from '../features/profile/api/profile-api';

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

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  verifyRoute,
  forgotPasswordRoute,
  searchRoute,
  hotelDetailRoute,
  checkoutRoute,
  finalRoute,
  profileRoute,
  bookingHistoryRoute,
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
