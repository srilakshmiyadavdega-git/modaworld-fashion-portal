import Navbar from './components/Navbar'
import Footer from './components/Footer'


import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Women from './pages/Women'
import Men from './pages/Men'
import Kids from './pages/Kids'
import NewArrivals from './pages/NewArrivals'
import Sale from './pages/Sale'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Whishlist from './pages/Whishlist'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import OderTracking from './pages/OderTracking'
import Profile from './pages/Profile'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

import "./styles/app.css"



const App = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/pages/admin') ||
    location.pathname === '/adminDashboard';

  return (
  <>

    {!isAdminRoute && <Navbar/>}
 

    <Routes>
      
    
      <Route path="/" element={<Home />} />

      <Route path="/women" element={<Women />} />

      <Route path="/men" element={<Men />} />

      <Route path="/kids" element={<Kids />} />

      <Route path="/new-arrivals" element={<NewArrivals />}/>

      <Route path="/sale" element={<Sale />} />
     

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/wishlist" element={<Whishlist />}/>

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/tracking" element={<OderTracking/>} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallbacks & redirects for admin routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/adminDashboard" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/pages/adminDashboard" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
    {!isAdminRoute && <Footer />}
  </>
  )
}

export default App
