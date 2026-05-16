import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <main className="pt-xl pb-xl px-gutter max-w-container-max mx-auto mt-lg min-h-[calc(100vh-200px)]">
      <h1 className="font-headline-xl text-headline-xl mb-lg">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left Column: Items List */}
        <div className="lg:col-span-8 space-y-md">
          {cartItems.length === 0 ? (
            <div className="p-lg border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center text-on-surface-variant opacity-60 min-h-[300px]">
              <span className="material-symbols-outlined text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 0" }}>add_shopping_cart</span>
              <p className="font-body-md">Keranjang Belanja Kosong. <Link className="text-primary font-bold underline" to="/produk">Mulai Belanja</Link></p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.product} className="bg-surface-container-lowest p-md rounded-xl flex flex-col sm:flex-row gap-md items-start sm:items-center shadow-[0px_4px_20px_rgba(0,0,0,0.03)] hover:scale-[1.01] transition-transform duration-300">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                    <img alt={item.nama} className="w-full h-full object-cover" src={item.gambar} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-headline-md text-headline-md mb-1">{item.nama}</h3>
                    <p className="text-on-surface-variant font-body-md mb-4">Rp {item.harga.toLocaleString()}</p>
                    <div className="flex items-center gap-md">
                      <div className="flex items-center border border-outline-variant rounded-full px-2 py-1">
                        <button onClick={() => updateQuantity(item.product, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="px-4 font-body-md font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product)} className="text-error font-button text-button flex items-center gap-1 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="sm:text-right w-full sm:w-auto mt-4 sm:mt-0">
                    <span className="font-headline-md text-headline-md text-primary">Rp {(item.harga * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div className="p-lg border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center text-on-surface-variant opacity-60 mt-lg">
                <span className="material-symbols-outlined text-4xl mb-2">add_shopping_cart</span>
                <p className="font-body-md">Looking for more? <Link className="text-primary font-bold underline" to="/produk">Continue Shopping</Link></p>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low p-lg rounded-xl shadow-[0px_10px_40px_rgba(0,0,0,0.06)] sticky top-32">
            <h2 className="font-headline-lg text-headline-lg mb-lg">Order Summary</h2>
            <div className="space-y-md mb-xl">
              <div className="flex justify-between font-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>Rp {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body-md text-on-surface-variant">
                <span>Shipping</span>
                <span className="text-primary-container font-semibold">Calculated at next step</span>
              </div>
              <div className="pt-md border-t border-outline-variant flex justify-between items-center">
                <span className="font-headline-md text-headline-md">Total</span>
                <span className="font-headline-md text-headline-md text-primary">Rp {getCartTotal().toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              disabled={cartItems.length === 0}
              className={`w-full font-button text-button py-4 rounded-xl flex items-center justify-center gap-sm transition-all shadow-sm ${cartItems.length === 0 ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed' : 'bg-primary-container text-on-primary-container hover:brightness-105 active:scale-[0.98]'}`}
            >
              Proceed to Checkout
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            
            <div className="mt-lg pt-lg border-t border-outline-variant/30 flex items-center gap-sm text-on-surface-variant text-[12px] justify-center">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              Secure SSL Encryption & Privacy Protected
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
