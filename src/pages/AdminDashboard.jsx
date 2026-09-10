import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../redux/slices/adminSlice'
import "../style/admin.css"

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdminLoggedIn = useSelector(
    (state) => state.admin.isAdminLoggedIn
  );

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/admin/login");
    }
  }, [isAdminLoggedIn, navigate]);

  const adminName = useSelector(
    (state) => state.admin.adminName
  );

  // FIX: products array ni direct ga select cheyyali
  const products =
    useSelector((state) => state.products.products) || [];

  const cartItems =
    useSelector((state) => state.cart.items) || [];

  const users =
    useSelector((state) => state.auth.users) || [];

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    category: "Women",
    price: "",
    oldPrice: "",
    image: "",
    description: "",
  });

  if (!isAdminLoggedIn) {
    return null;
  }

  const totalProducts = products.length;
  const totalUsers = users.length;
  const totalOrders = cartItems.length;

  const totalRevenue = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login");
  };

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    alert(
      "Product form submitted. Connect this form to your productSlice/API to permanently add products."
    );

    setProduct({
      name: "",
      category: "Women",
      price: "",
      oldPrice: "",
      image: "",
      description: "",
    });

    setShowAddProduct(false);
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="brand-icon">M</div>

          <div>
            <h2>ModaWorld</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">

          <button
            className={
              activeMenu === "Dashboard" ? "active" : ""
            }
            onClick={() => setActiveMenu("Dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={
              activeMenu === "Products" ? "active" : ""
            }
            onClick={() => setActiveMenu("Products")}
          >
            👗 Products
          </button>

          <button
            className={
              activeMenu === "Orders" ? "active" : ""
            }
            onClick={() => setActiveMenu("Orders")}
          >
            🛒 Orders
          </button>

          <button
            className={
              activeMenu === "Users" ? "active" : ""
            }
            onClick={() => setActiveMenu("Users")}
          >
            👥 Users
          </button>

          <button
            className={
              activeMenu === "Analytics" ? "active" : ""
            }
            onClick={() => setActiveMenu("Analytics")}
          >
            📈 Analytics
          </button>

          <button
            className={
              activeMenu === "Settings" ? "active" : ""
            }
            onClick={() => setActiveMenu("Settings")}
          >
            ⚙️ Settings
          </button>

        </nav>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">

        {/* TOP BAR */}
        <header className="admin-header">

          <div>
            <h1>{activeMenu}</h1>
            <p>Welcome back, {adminName}</p>
          </div>

          <div className="admin-profile">

            <div className="admin-avatar">A</div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>

          </div>

        </header>

        {/* DASHBOARD */}
        {activeMenu === "Dashboard" && (
          <>

            <section className="stats-grid">

              <div className="stat-card">
                <div className="stat-icon purple">👗</div>

                <div>
                  <p>Total Products</p>
                  <h2>{totalProducts}</h2>
                  <span>Products available</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pink">👥</div>

                <div>
                  <p>Total Users</p>
                  <h2>{totalUsers}</h2>
                  <span>Registered users</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">🛒</div>

                <div>
                  <p>Total Orders</p>
                  <h2>{totalOrders}</h2>
                  <span>Current orders</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">₹</div>

                <div>
                  <p>Revenue</p>
                  <h2>₹{totalRevenue}</h2>
                  <span>Current revenue</span>
                </div>
              </div>

            </section>

            {/* QUICK ACTIONS */}
            <section className="dashboard-card">

              <div className="section-heading">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Manage your ModaWorld store</p>
                </div>
              </div>

              <div className="quick-actions">

                <button
                  onClick={() => {
                    setActiveMenu("Products");
                    setShowAddProduct(true);
                  }}
                >
                  ➕
                  <span>Add Product</span>
                </button>

                <button
                  onClick={() => setActiveMenu("Products")}
                >
                  👗
                  <span>Manage Products</span>
                </button>

                <button
                  onClick={() => setActiveMenu("Orders")}
                >
                  📦
                  <span>View Orders</span>
                </button>

                <button
                  onClick={() => setActiveMenu("Users")}
                >
                  👥
                  <span>View Users</span>
                </button>

              </div>

            </section>

            {/* RECENT PRODUCTS */}
            <section className="dashboard-card">

              <div className="section-heading">

                <div>
                  <h2>Recent Products</h2>
                  <p>Latest products in your store</p>
                </div>

                <button
                  className="view-btn"
                  onClick={() => setActiveMenu("Products")}
                >
                  View All
                </button>

              </div>

              <div className="product-table">

                <div className="table-header">
                  <span>Product</span>
                  <span>Category</span>
                  <span>Price</span>
                  <span>Status</span>
                </div>

                {products.slice(0, 5).map((item) => (
                  <div
                    className="table-row"
                    key={item.id}
                  >

                    <div className="product-info">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <strong>{item.name}</strong>
                        <small>ID: {item.id}</small>
                      </div>

                    </div>

                    <span>{item.category}</span>

                    <strong>₹{item.price}</strong>

                    <span className="status">Active</span>

                  </div>
                ))}

              </div>

            </section>

          </>
        )}

        {/* PRODUCTS */}
        {activeMenu === "Products" && (
          <section className="dashboard-card">

            <div className="section-heading">

              <div>
                <h2>Product Management</h2>
                <p>Manage all ModaWorld products</p>
              </div>

              <button
                className="add-product-btn"
                onClick={() =>
                  setShowAddProduct(!showAddProduct)
                }
              >
                + Add Product
              </button>

            </div>

            {showAddProduct && (
              <form
                className="add-product-form"
                onSubmit={handleAddProduct}
              >

                <h3>Add New Product</h3>

                <input
                  name="name"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />

                <select
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                >
                  <option>Women</option>
                  <option>Men</option>
                  <option>Kids</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                />

                <input
                  type="number"
                  name="oldPrice"
                  placeholder="Old Price"
                  value={product.oldPrice}
                  onChange={handleInputChange}
                />

                <input
                  name="image"
                  placeholder="Image URL"
                  value={product.image}
                  onChange={handleInputChange}
                  required
                />

                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={product.description}
                  onChange={handleInputChange}
                />

                <button type="submit">
                  Add Product
                </button>

              </form>
            )}

            <div className="admin-products">

              {products.map((item) => (
                <div
                  className="admin-product-card"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="admin-product-content">

                    <h3>{item.name}</h3>

                    <p>{item.category}</p>

                    <strong>₹{item.price}</strong>

                  </div>

                  <span className="active-badge">
                    Active
                  </span>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* ORDERS */}
        {activeMenu === "Orders" && (
          <section className="dashboard-card">

            <div className="section-heading">

              <div>
                <h2>Order Management</h2>
                <p>View and manage customer orders</p>
              </div>

            </div>

            <div className="order-empty">

              <div>📦</div>

              <h3>Order Management</h3>

              <p>
                Orders will appear here after
                customers place orders.
              </p>

            </div>

          </section>
        )}

        {/* USERS */}
        {activeMenu === "Users" && (
          <section className="dashboard-card">

            <div className="section-heading">

              <div>
                <h2>User Management</h2>
                <p>Registered ModaWorld customers</p>
              </div>

            </div>

            {users.length > 0 ? (
              <div className="users-table">

                {users.map((user, index) => (
                  <div
                    className="user-row"
                    key={user.id || index}
                  >

                    <div className="user-avatar">
                      {user.name
                        ? user.name
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </div>

                    <div>
                      <strong>
                        {user.name || "User"}
                      </strong>

                      <small>
                        {user.email || "No email"}
                      </small>
                    </div>

                    <span>Customer</span>

                  </div>
                ))}

              </div>
            ) : (
              <div className="order-empty">

                <div>👥</div>

                <h3>No users found</h3>

                <p>
                  Registered customers will
                  appear here.
                </p>

              </div>
            )}

          </section>
        )}

        {/* ANALYTICS */}
        {activeMenu === "Analytics" && (
          <section className="dashboard-card">

            <h2>Store Analytics</h2>

            <div className="analytics-box">

              <div>
                <span>Products</span>
                <strong>{totalProducts}</strong>
              </div>

              <div>
                <span>Users</span>
                <strong>{totalUsers}</strong>
              </div>

              <div>
                <span>Orders</span>
                <strong>{totalOrders}</strong>
              </div>

              <div>
                <span>Revenue</span>
                <strong>₹{totalRevenue}</strong>
              </div>

            </div>

          </section>
        )}

        {/* SETTINGS */}
        {activeMenu === "Settings" && (
          <section className="dashboard-card">

            <h2>Admin Settings</h2>

            <div className="settings-item">
              <span>Store Name</span>
              <strong>ModaWorld</strong>
            </div>

            <div className="settings-item">
              <span>Admin Email</span>
              <strong>admin@modaworld.com</strong>
            </div>

            <div className="settings-item">
              <span>Store Status</span>
              <span className="status">Active</span>
            </div>

          </section>
        )}

      </main>

    </div>
  );
};

export default AdminDashboard