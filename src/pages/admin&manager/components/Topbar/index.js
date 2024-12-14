import { Link, useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard");
  const isManageBooking = location.pathname.includes("manage-booking");
  const isManageProperties = location.pathname.includes("manage-properties");
  const isHotelReviews = location.pathname.includes("hotel-reviews");

  const getTitle = () => {
    if (isDashboard) return "Dashboard";
    if (isManageBooking) return "Manage Bookings";
    if (isManageProperties) return "Manage Properties";
    if (isHotelReviews) return "Reviews";
  };
  const managerData = JSON.parse(localStorage.getItem("manager"));

  return (
    <div className="topbar">
      <div className="topbar__title">{getTitle()}</div>
      <div className="topbar__user">
        <img
          src={managerData?.avatar}
          alt="avatar"
          className="topbar__user__avatar"
        />
        <div className="topbar__user__name">{managerData?.fullName}</div>
        <Link to="/admin/login" className="topbar__user__logout">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
