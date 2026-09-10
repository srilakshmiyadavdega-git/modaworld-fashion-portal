import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from "../redux/slices/authSlice"
import "../styles/auth.css"
const Login = () => {
 const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const {
    loading,
    error
  } = useSelector(
    (state) => state.auth
  );

  const submit = async (e) => {

    e.preventDefault();

    const result =
      await dispatch(
        loginUser({
          email,
          password
        })
      );

    if (
      loginUser.fulfilled.match(
        result
      )
    ) {

      alert(
        "Login successful ❤️"
      );

      navigate("/");

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <Link
          to="/"
          className="auth-logo"
        >
          Moda
          <span>World</span>
        </Link>

        <div className="auth-icon">
          👋
        </div>

        <h1>
          Welcome Back!
        </h1>

        <p>
          Login to continue shopping
        </p>

        <form
          onSubmit={submit}
        >

          <label>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="or">
          OR
        </div>

        <button className="social">
          🌐 Continue with Google
        </button>

        <button className="social">
          f Continue with Facebook
        </button>

        <p className="auth-bottom">

          Don't have an account?

          <Link to="/register">
            {" "}Create Account
          </Link>

        </p>

        <p className="auth-bottom" style={{ marginTop: "12px", fontSize: "13px" }}>
          Admin user?
          <Link to="/admin/login"> Admin Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Login
