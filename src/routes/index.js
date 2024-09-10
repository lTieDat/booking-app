// import PrivateRoute from "../components/PrivateRoute";
import LayoutDefault from "../DefaultLayout/index";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import SearchResult from "../pages/searchresults";
import HotelDetail from "../pages/hotelDetail";

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
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];

export default routes;
