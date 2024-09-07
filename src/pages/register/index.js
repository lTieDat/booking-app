import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/CustomCss/login.scss";
import { login } from "../../service/userService";
import Logo from "../../components/Logo";
import ShowPassword from "../../components/ShowPassword";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("email in submit:", email);
  };

  return (
    <>
      <div className="login__logo">
        <Logo />
      </div>
      <div className="login">
        <h2 className="login__title">Register</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Email address
            </label>
            <input
              className="login__input"
              type="text"
              id="email"
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* Create password */}
            <label className="login__label" htmlFor="password">
              Create password
            </label>
            <ShowPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
            />
            {/* Confirm password */}
            <label className="login__label" htmlFor="confirm-password">
              Confirm password
            </label>
            <ShowPassword
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
          <div className="login__authentication"></div>
          <button className="login__button" type="submit">
            Verify email
          </button>
          <p className="login__signup-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
