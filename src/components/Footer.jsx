import React from 'react'
import { Link } from 'react-router-dom'
import Services from './Services'
import "../styles/footer.css"

const Footer = () => {
   return (
    <>

      <Services />

      <footer className="footer">

        <div className="footer-grid">

          <div>

            <Link
              to="/"
              className="footer-logo"
            >
              Moda
              <span>World</span>
            </Link>

            <p>
              Fashion that defines
              your world.
            </p>

          </div>

          <div>

            <h3>
              Shop
            </h3>

            <Link to="/women">
              Women
            </Link>

            <Link to="/men">
              Men
            </Link>

            <Link to="/kids">
              Kids
            </Link>

            <Link to="/sale">
              Sale
            </Link>

          </div>

          <div>

            <h3>
              Customer
            </h3>

            <Link to="/cart">
              Cart
            </Link>

            <Link to="/wishlist">
              Wishlist
            </Link>

            <Link to="/tracking">
              Track Order
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <Link to="/admin/login">
              Admin Portal
            </Link>

          </div>

          <div>

            <h3>
              Contact
            </h3>

            <p>
              📧 support@modaworld.com
            </p>

            <p>
              📞 +91 9063505130
            </p>

            <p>
              📍 India
            </p>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 ModaWorld.
          All Rights Reserved.

        </div>

      </footer>

    </>
  );
}

export default Footer
