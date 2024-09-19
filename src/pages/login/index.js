import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/CustomCss/login.scss";
import { login } from "../../service/userService";
import Cookies from "js-cookie";
import Logo from "../../components/Logo";
import { Checkbox } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("email in submit:", email);
    console.log("password in submit:", password);
    const response = await login(email, password, rememberMe);
    if (response) {
      navigate("/");
      console.log("Login successful");
    }
  };

  return (
    <>
      <div className="login__logo">
        <Logo />
      </div>
      <div className="login">
        <h2 className="login__title">Sign In</h2>
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              className="login__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login__authentication">
            <Checkbox className="login__checkbox" onChange={handleRememberMe}>
              Keep me signed in
            </Checkbox>
            <a className="login__forgot-password" href="/forgot-password">
              Forgot password?
            </a>
          </div>
          <button className="login__button" type="submit">
            Sign In
          </button>
          <p className="login__signup-text">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
