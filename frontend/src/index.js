import React from 'react';
import ReactDOM from 'react-dom/client';
import LogRocket from 'logrocket';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import App from './App';

LogRocket.init('ahilgj/toko-online-mern-v2');

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);