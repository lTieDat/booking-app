import { Link } from "react-router-dom";

function LogoManager() {
  const headerStyle = {
    fontSize: "26px",
    fontFamily: "var(--fontLogo)",
    margin: "10px 20px",
  };

  return (
    <div className="logoAdmin">
      <Link to="/" style={headerStyle}>
        Hotels Booking Management
      </Link>
    </div>
  );
}

export default LogoManager;
