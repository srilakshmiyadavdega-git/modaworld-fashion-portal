import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { registerNewUser } from '../redux/slices/authSlice'
import "../styles/auth.css"

const Register = () => {
   const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const {
    loading,
    error
  } = useSelector(
    (state) => state.auth
  );

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const submit = async (e) => {

    e.preventDefault();

    const result =
      await dispatch(
        registerNewUser(form)
      );

    if (
      registerNewUser.fulfilled.match(
        result
      )
    ) {

      alert(
        "Account created successfully ❤️"
      );

      navigate("/login");

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
          ✨
        </div>

        <h1>
          Create Account
        </h1>

        <p>
          Join ModaWorld today
        </p>

        <form
          onSubmit={submit}
        >

          <label>
            Full Name
          </label>

          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={change}
            required
          />

          <label>
            Email Address
          </label>

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={change}
            required
          />

          <label>
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={form.password}
            onChange={change}
            required
          />

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <label className="terms">

            <input
              type="checkbox"
              required
            />

            I agree to Terms &
            Conditions

          </label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="auth-bottom">

          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>

        </p>

      </div>

    </div>
  );

}

export default Register
