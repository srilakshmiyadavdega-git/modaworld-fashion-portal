import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logoutUser } from"../redux/slices/authSlice"
import { useDispatch } from 'react-redux'
import "../styles/navbar.css"

const Navbar = () => {
      const dispatch = useDispatch();

  const navigate = useNavigate();

  const [menu, setMenu] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const cartItems =
    useSelector(
      (state) => state.cart.items
    );

  const wishlistItems =
    useSelector(
      (state) =>
        state.wishlist.items
    );

  const user =
    useSelector(
      (state) => state.auth.user
    );

  const cartCount =
    cartItems.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const wishlistCount =
    wishlistItems.length;

  const submitSearch = (e) => {

    e.preventDefault();

    if (search.trim()) {

      navigate(
        `/?search=${encodeURIComponent(
          search
        )}`
      );

    }
  };

  const handleLogout = () => {

    dispatch(logoutUser());

    navigate("/");

  };

  return (
        <header className="navbar">

      <Link
        to="/"
        className="logo"
      >
        Moda
        <span>World</span>
      </Link>

      <button
        className="mobile-toggle"
        onClick={() =>
          setMenu(!menu)
        }
      >
        ☰
      </button>

      <nav
        className={
          menu
            ? "nav-links active"
            : "nav-links"
        }
      >

        <Link to="/"> Home</Link>

        <Link to="/women">Women</Link>

        <Link to="/men">Men</Link>

        <Link to="/kids">Kids</Link>

        <Link to="/new-arrivals">New Arrivals</Link>

        <Link to="/sale" className="sale-link">Sale</Link>
        

      </nav>

      <form className="search-box" onSubmit={submitSearch}>

        <span>🔎</span>

        <input value={search} onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search fashion..."
        />

      </form>

      <div className="nav-actions">

        <Link to="/wishlist" className="nav-action">
          ♡

          {wishlistCount > 0 && (
            <span className="badge">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link
          to="/cart"
          className="nav-action"
        >
          🛒

          {cartCount > 0 && (
            <span className="badge">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (

          <button
            className="profile-button"
            onClick={() =>
              navigate("/profile")
            }
          >
            👤
          </button>

        ) : (

          <Link
            to="/login"
            className="login-link">
            Login
          </Link>

        )}

      </div>

    </header>

   
  )
}

export default Navbar
