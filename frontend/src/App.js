import React, { useState, useEffect, useContext } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Register from './pages/Register';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import ProtectedRoute from './components/ProtectedRoute';
import { CartContext } from './context/CartContext';

import './App.css';

function App() {

  // State user login
  const [user, setUser] = useState(null);
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Cek user saat aplikasi dibuka atau rute berubah
  useEffect(() => {

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }

  }, [location.pathname]);

  // Logout
  const handleLogout = () => {

    localStorage.removeItem('user');

    setUser(null);

    navigate('/');
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border-b border-outline-variant/30 dark:border-outline/20 shadow-sm">
        <nav className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-md">
            <Link to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
              TokoOnline
            </Link>
            <div className="hidden md:flex items-center gap-md ml-lg">
              <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-body-md text-body-md" to="/">Beranda</Link>
              <Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors font-body-md text-body-md" to="/produk">Produk</Link>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-md focus:outline-none focus:border-primary w-64" placeholder="Search..." type="text"/>
            </div>
            <Link to="/cart" className="relative p-2 hover:opacity-80 transition-all duration-200 active:scale-95 text-primary flex items-center">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartItems.length > 0 && (
                <span className="absolute top-0 -right-1 bg-error text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cartItems.length}</span>
              )}
            </Link>
            <div className="flex items-center gap-base ml-base">
              {user ? (
                <>
                  <span className="font-button text-button text-on-surface hidden md:inline">Hai, {user.name}</span>
                  <button onClick={handleLogout} className="px-md py-2 font-button text-button bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all">Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-md py-2 font-button text-button text-primary hover:bg-primary/5 rounded-lg transition-all">Login</Link>
                  <Link to="/register" className="px-md py-2 font-button text-button bg-primary text-on-primary rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all">Join</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 min-h-[calc(100vh-200px)]">

        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* Produk (Unprotected) */}
          <Route
            path="/produk"
            element={<ProductsPage />}
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

          {/* Cart */}
          <Route
            path="/cart"
            element={<CartPage />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      {/* Footer */}
      <footer className="w-full py-xl bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter max-w-container-max mx-auto text-center md:text-left">
          <div className="space-y-md">
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">TokoOnline</span>
            <p className="font-body-md text-body-md text-on-surface-variant">Elevating the standards of modern essential products through precision and minimal design.</p>
          </div>
          <div className="space-y-sm">
            <h4 className="font-button text-button font-bold text-on-surface">Shop</h4>
            <ul className="space-y-xs">
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" to="/produk">New Arrivals</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" to="/produk">Best Sellers</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" to="/produk">Accessories</Link></li>
            </ul>
          </div>
          <div className="space-y-sm">
            <h4 className="font-button text-button font-bold text-on-surface">Company</h4>
            <ul className="space-y-xs">
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" to="/">About Us</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" to="/">Careers</Link></li>
              <li><Link className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" to="/">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-sm">
            <h4 className="font-button text-button font-bold text-on-surface">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-md">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">photo_camera</span></a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
            </div>
          </div>
        </div>
        <div className="mt-xl pt-lg border-t border-outline-variant/20 max-w-container-max mx-auto px-gutter text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">© 2026 TokoOnline. All rights reserved.</p>
          <div className="mt-sm flex justify-center gap-md">
            <a className="text-on-surface-variant hover:text-primary transition-colors text-[14px]" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors text-[14px]" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;