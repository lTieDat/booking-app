import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__row">
          {/* Section 1: Logo and Tagline */}
          <div className="footer__column footer__column--logo">
            <Logo />
            <p className="footer__tagline">Your companion for travel</p>
          </div>

          {/* Section 2: Company Links */}
          <div className="footer__column footer__column--company">
            <h5 className="footer__heading">Company</h5>
            <ul className="footer__list">
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">Jobs</Link>
              </li>
              <li>
                <Link to="#">Newsroom</Link>
              </li>
              <li>
                <Link to="#">Advertising</Link>
              </li>
              <li>
                <Link to="#">Contact us</Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Explore Links */}
          <div className="footer__column footer__column--explore">
            <h5 className="footer__heading">Explore</h5>
            <ul className="footer__list">
              <li>
                <Link to="#">Australia</Link>
              </li>
              <li>
                <Link to="#">New Zealand</Link>
              </li>
              <li>
                <Link to="#">United States America (USA)</Link>
              </li>
              <li>
                <Link to="#">Greece</Link>
              </li>
              <li>
                <Link to="#">Maldives</Link>
              </li>
              <li>
                <Link to="#">Singapore</Link>
              </li>
              <li>
                <Link to="#">See more</Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Terms and Policies */}
          <div className="footer__column footer__column--terms">
            <h5 className="footer__heading">Terms and Policies</h5>
            <ul className="footer__list">
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms of use</Link>
              </li>
              <li>
                <Link to="#">Accessibility</Link>
              </li>
              <li>
                <Link to="#">Reward system policy</Link>
              </li>
            </ul>
          </div>

          {/* Section 5: Help Links */}
          <div className="footer__column footer__column--help">
            <h5 className="footer__heading">Help</h5>
            <ul className="footer__list">
              <li>
                <Link to="#">Support</Link>
              </li>
              <li>
                <Link to="#">Cancel your bookings</Link>
              </li>
              <li>
                <Link to="#">Use Coupon</Link>
              </li>
              <li>
                <Link to="#">Refund Policies</Link>
              </li>
              <li>
                <Link to="#">International Travel Documents</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 6: Footer Bottom */}
        <div className="footer__bottom">
          <p>&copy; Product of Le Tien Dat - B21DCVT013</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
