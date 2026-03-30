import { Link } from "react-router-dom";

function Logo({ headerStyle }) {
  return (
    <div className="logo">
      <Link to="/" style={headerStyle}>
        Booking hotels
      </Link>
    </div>
  );
}

export default Logo;
