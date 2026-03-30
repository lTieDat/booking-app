import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../components/Logo";
import { getUserByToken } from "../service/userService";
import { useEffect, useState } from "react";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = Cookies.get("token");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      getUserByToken(accessToken)
        .then((response) => {
          if (response?.data) {
            setUser(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const isHomePage = pathname === "/";
  const isSearchPage = pathname.includes("/searchresult");
  const isCheckoutPage = pathname.includes("/checkout");

  const getTextColor = () => {
    if (isHomePage || isCheckoutPage || isSearchPage) {
      return "white";
    }
    return "black";
  };

  const headerStyles = {
    color: getTextColor(),
    backgroundColor: isSearchPage || isCheckoutPage ? "#2F80ED" : "",
  };

  return (
    <header className="layout__header" style={headerStyles}>
      <div className="layout__header-container">
        <Logo headerStyle={{ color: getTextColor() }} />
        <nav className="layout__header-nav">
          <ul className="layout__header-nav-list">
            {["about", "activities", "contact"].map((page) => (
              <li key={page} className="layout__header-nav-item">
                <Link to={`/${page}`} className="nav-link" target="_blank">
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            ))}
            <li className="layout__header-nav-item">
              <div className="layout__header-nav-auth">
                {accessToken ? (
                  <div className="layout__header-nav-authenticated">
                    {/* Display user info and dropdown if user is logged in */}
                    <div className="user-dropdown">
                      <a
                        href="/profile"
                        className="user-button"
                        target="_blank"
                      >
                        {!loading && user ? (
                          <span>{user.userName}</span>
                        ) : (
                          <span>User</span>
                        )}
                      </a>
                      <div className="user-dropdown-menu">
                        <Link
                          to="/profile"
                          className="nav-link"
                          target="_blank"
                        >
                          Manage account
                        </Link>
                        <Link
                          to="/bookings-trips"
                          className="nav-link"
                          target="_blank"
                        >
                          Bookings & Trips
                        </Link>
                        <a
                          href="/"
                          onClick={handleLogout}
                          className="nav-link"
                          target="_blank"
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="layout__header-nav-btn">
                    <Link to="/login" className="nav-link" target="_blank">
                      Sign in
                    </Link>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
