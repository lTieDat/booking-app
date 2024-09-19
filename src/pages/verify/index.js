import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/CustomCss/login.scss";
import { verifyEmail } from "../../service/userService";
import Logo from "../../components/Logo";
import Cookies from "js-cookie";

function Register() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = new URLSearchParams(window.location.search).get("email");
    try {
      const response = await verifyEmail(email, code);
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 1 });
        alert("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="login__logo">
        <Logo />
      </div>
      <div className="login">
        <h2 className="login__title">Verify email</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <label className="login__label" htmlFor="email">
              Verify code
            </label>
            <input
              className="login__input"
              type="text"
              id="code"
              value={code}
              placeholder="Enter code sent to email"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="login__authentication"></div>
          <button className="login__button" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
