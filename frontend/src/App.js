import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Register from './pages/Register';
import Login from './pages/Login';

import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {

  // State user login
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Cek user saat aplikasi dibuka
  useEffect(() => {

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem('user');

    setUser(null);

    navigate('/login');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">

        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            TokoOnline
          </Link>

          {/* Menu */}
          <div className="nav-links">

            <Link to="/" className="nav-link">
              Beranda
            </Link>

            <Link to="/produk" className="nav-link">
              Produk
            </Link>

          </div>

          {/* Auth */}
          <div className="nav-links">

            {user ? (
              <>
                <span>
                  Halo, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="logout-button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>

                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}

          </div>

        </div>

      </nav>

      {/* Main Content */}
      <main className="main-content">

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Protected Produk */}
          <Route
            path="/produk"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          {/* Detail Produk */}
          <Route
            path="/produk/:id"
            element={<ProductDetailPage />}
          />

          {/* Register */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 TokoOnline. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;