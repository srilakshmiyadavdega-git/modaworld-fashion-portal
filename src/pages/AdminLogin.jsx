import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../redux/slices/adminSlice'
import "../styles/adminlogin.css"

const AdminLogin = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdminLoggedIn = useSelector(
    (state) => state.admin.isAdminLoggedIn
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === "admin@gmail.com" || cleanEmail === "admin@modaworld.com") &&
      password === "admin123"
    ) {
      dispatch(adminLogin());
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-logo">
          M
        </div>

        <h1>ModaWorld</h1>

        <p className="admin-title">
          Admin Panel
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login to Dashboard
          </button>

        </form>

        <p className="admin-demo">
          Demo: admin@modaworld.com / admin123
        </p>

      </div>
    </div>
  );

}

export default AdminLogin
