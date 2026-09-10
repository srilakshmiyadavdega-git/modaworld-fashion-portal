import React from 'react'
import "../styles/profile.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { logoutUser as logoutUserAction } from "../redux/slices/authSlice" 

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user =
    useSelector(
      (state) =>
        state.auth.user
    );

  const logoutUser = () => {

    dispatch(logoutUserAction());

    navigate("/login");

  };

  if (!user) {

    return (
      <>
        {/* <Navbar /> */}

        <section className="profile-page">

          <div className="profile-empty">

            <h2>
              Please Login
            </h2>

            <button
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>

          </div>

        </section>

        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}

      <section className="profile-page">

        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <h1>
            {user.name}
          </h1>

          <p>
            {user.email}
          </p>

          <hr />

          <div className="profile-row">

            <span>
              Full Name
            </span>

            <strong>
              {user.name}
            </strong>

          </div>

          <div className="profile-row">

            <span>
              Email
            </span>

            <strong>
              {user.email}
            </strong>

          </div>

          <button
            className="logout-button"
            onClick={logoutUser}
          >
            Logout
          </button>

        </div>

      </section>

      {/* <Footer /> */}
    </>
  );
}

export default Profile
