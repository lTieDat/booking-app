import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../components/Logo";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = Cookies.get("token");

  const isHomePage = pathname === "/";
  const isSearchPage = pathname === "/searchresult";
  const isCheckoutPage = pathname.includes("/checkout");

  const getTextColor = () =>
    (isHomePage, isCheckoutPage) || isSearchPage ? "white" : "black";

  const headerStyles = {
    color: getTextColor(),
    backgroundColor: (isSearchPage, isCheckoutPage) ? "#2F80ED" : "",
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <header className="layout__header" style={headerStyles}>
      <div className="layout__header-container">
        <Logo headerStyle={{ color: getTextColor() }} />
        <nav className="layout__header-nav">
          <ul className="layout__header-nav-list">
            {["about", "activities", "contact"].map((page) => (
              <li key={page} className="layout__header-nav-item">
                <Link to={`/${page}`} style={{ color: getTextColor() }}>
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            ))}
            <li className="layout__header-nav-item">
              <div className="layout__header-nav-auth">
                {accessToken ? (
                  <div className="layout__header-nav-authenticated">
                    <div className="layout__header-nav-btn">
                      <Link to="/profile" style={{ color: getTextColor() }}>
                        Profile
                      </Link>
                    </div>
                    <div className="layout__header-nav-btn">
                      <a
                        href="/"
                        onClick={handleLogout}
                        style={{ color: getTextColor() }}
                      >
                        Log out
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="layout__header-nav-btn">
                    <Link to="/login" style={{ color: getTextColor() }}>
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
