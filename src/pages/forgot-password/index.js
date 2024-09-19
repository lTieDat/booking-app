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
        <h2 className="login__title">Reset password</h2>
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
          </div>
          <div className="login__authentication"></div>
          <button className="login__button" type="submit">
            Send code
          </button>
          <p className="login__signup-text">
            Want to create new account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
