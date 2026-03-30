import PrivateRoute from '../components/PrivateRoute'
import LayoutDefault from '../DefaultLayout/index'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import SearchResult from '../pages/searchresults'
import HotelDetail from '../pages/hotelDetail'
import Checkout from '../pages/checkout'
import Verify from '../pages/verify'
import FinalStep from '../pages/final/index'
import ProfilePage from '../pages/profile'
import BookingHistory from '../pages/bookingHistory'
import ForgotPassword from '../pages/forgot-password'
import ManagePage from '../pages/admin&manager/index'
import Dashboard from '../pages/admin&manager/components/dashboard/dashboard'
import ManageBooking from '../pages/admin&manager/components/ManageBooking/index'
import Reviews from '../pages/admin&manager/components/HotelReviews/index'
import ManageProperties from '../pages/admin&manager/components/manageProperties'
import HotelDetails from '../pages/admin&manager/components/dashboard/components/detail/index'
import PropertyDetail from '../pages/admin&manager/components/manageProperties/components/propertyDetail'
import AddNewProperty from '../pages/admin&manager/components/manageProperties/components/AddNewProperties'
import ManageAccount from '../pages/admin&manager/components/AccountManage/index'
import SettingComponent from '../pages/admin&manager/components/Settings/index'
import { Navigate } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'searchresult',
        element: <SearchResult />,
      },
      {
        path: 'hotelDetail/:id',
        element: <HotelDetail />,
      },
      {
        path: 'checkout/:id',
        element: <Checkout />,
      },
      {
        path: 'booking/:bookingId/final',
        element: <FinalStep />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'bookings-trips',
        element: <BookingHistory />,
      },
    ],
  },
  {
    path: 'admin/managePage',
    element: <ManagePage />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: ':hotelId',
            element: <HotelDetails />,
          },
        ],
      },
      {
        path: 'manage-booking',
        element: <ManageBooking />,
      },
      {
        path: 'hotel-reviews',
        element: <Reviews />,
      },
      {
        path: 'manage-properties',
        element: <ManageProperties />,
        children: [
          {
            path: ':hotelId',
            element: <PropertyDetail />,
          },
        ],
      },
      {
        path: 'manage-properties/add-new-property',
        element: <AddNewProperty />,
      },
      {
        path: 'manage-account',
        element: <ManageAccount />,
      },
      {
        path: 'manage-settings',
        element: <SettingComponent />,
      },
    ],
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'verify',
    element: <Verify />,
  },
  {
    path: 'loginManager',
    element: <Login />,
  },
]
