import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Membaca data keranjang dari localStorage saat pertama kali dimuat
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Setiap kali cartItems berubah, simpan ke localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Cek apakah item sudah ada di keranjang
      const existingItem = prevItems.find(item => item.product === product._id);
      if (existingItem) {
        // Jika ada, tambahkan quantity-nya
        return prevItems.map(item =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Jika belum ada, masukkan sebagai item baru
      // Kita pakai nama field sesuai dengan data backend (nama, harga, gambar)
      return [...prevItems, { 
        product: product._id, 
        nama: product.nama, 
        harga: product.harga, 
        gambar: product.gambar, 
        quantity 
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Jangan biarkan quantity di bawah 1
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.harga * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
