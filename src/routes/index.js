// import PrivateRoute from "../components/PrivateRoute";
import LayoutDefault from "../DefaultLayout/index";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import SearchResult from "../pages/searchresults";
import HotelDetail from "../pages/hotelDetail";
import Checkout from "../pages/checkout";
import Verify from "../pages/verify";
import FinalStep from "../pages/final/index";
import ProfilePage from "../pages/profile";
import BookingHistory from "../pages/bookingHistory";
import ForgotPassword from "../pages/forgot-password";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "searchresult",
        element: <SearchResult />,
      },
      {
        path: "hotelDetail/:id",
        element: <HotelDetail />,
      },
      {
        path: "checkout/:id",
        element: <Checkout />,
      },
      {
        path: "booking/:bookingId/final",
        element: <FinalStep />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "bookings-trips",
        element: <BookingHistory />,
      },
    ],
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "verify",
    element: <Verify />,
  },
];

export default routes;
