import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useLogin from "../fake-backend/useLogin";
import { Link } from "react-router-dom";
import ErrorAlert from "./authenticated/ErrorAlert";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const login = useLogin();
  const { setAuth } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/rigel/main";

  const handleChange = (e) => {
    const { id, value } = e.target;

    setLoginInfo((data) => {
      return {
        ...data,
        [id]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(loginInfo);

      if (result?.status === 200) {
        setShowErrorMessage(false);
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err?.response?.status) {
        setShowErrorMessage(true);
        if (err?.response?.status === 400) {
          setErrorMessage("Missing Username or Password!");
        } else if (err?.response?.status === 401) {
          setErrorMessage("Unauthorized!");
        } else {
          setErrorMessage("Login Failed!");
        }
      } else {
        setErrorMessage("Cannot Connect to the Server!");
      }
      return err.response;
    }
  };

  const handleBypass = () => {
    setAuth("TOKEN");
    setShowErrorMessage(false);
    navigate(from, { replace: true });
  };

  return (
    <>
      {showErrorMessage && (
        <ErrorAlert
          errorMessage={errorMessage}
          setShowErrorMessage={setShowErrorMessage}
        />
      )}
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={loginInfo.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            minLength={10}
            value={loginInfo.password}
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-light w-100 mb-1"
            disabled={!loginInfo.email || !loginInfo.password}
          >
            Login
          </button>
        </form>
        <div className="login-links">
          <Link
            to="/rigel/register"
            className="btn btn-link text-decoration-none"
          >
            Register
          </Link>
          <button
            className="btn btn-link text-decoration-none"
            onClick={handleBypass}
          >
            Bypass Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
