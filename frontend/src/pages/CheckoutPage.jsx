import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  });

  // Jika keranjang kosong, kembalikan ke halaman produk
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/produk');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (!token) {
      alert('Anda harus login terlebih dahulu!');
      navigate('/login');
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        product: item.product,
        nama: item.nama,
        harga: item.harga,
        gambar: item.gambar,
        quantity: item.quantity
      })),
      shippingAddress: formData,
      totalPrice: getCartTotal()
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert('Order placed successfully!');
        clearCart();
        navigate('/produk');
      } else {
        const errorData = await response.json();
        alert('Error placing order: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <main className="pt-32 pb-xl px-gutter max-w-container-max mx-auto min-h-[calc(100vh-200px)]">
      <div className="mb-lg">
        <h1 className="font-headline-xl text-headline-xl md:text-headline-xl text-on-background">Checkout</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Complete your order details below.</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-lg">
          {/* Shipping Section */}
          <section className="bg-surface-container-lowest p-gutter rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-md">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
              <h2 className="font-headline-md text-headline-md text-on-background">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="md:col-span-2">
                <label className="block font-label-sm-caps text-label-sm-caps text-outline mb-2">FULL NAME</label>
                <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="John Doe" type="text"/>
              </div>
              <div className="md:col-span-2">
                <label className="block font-label-sm-caps text-label-sm-caps text-outline mb-2">STREET ADDRESS</label>
                <textarea required name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="123 Developer Lane"></textarea>
              </div>
              <div>
                <label className="block font-label-sm-caps text-label-sm-caps text-outline mb-2">CITY</label>
                <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="San Francisco" type="text"/>
              </div>
              <div>
                <label className="block font-label-sm-caps text-label-sm-caps text-outline mb-2">ZIP CODE</label>
                <input required name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full bg-surface-bright border border-outline-variant rounded-lg p-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="94103" type="text"/>
              </div>
            </div>
          </section>

          {/* Payment Section Placeholder */}
          <section className="bg-surface-container-lowest p-gutter rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-outline-variant/10">
            <div className="flex items-center gap-3 mb-md">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <h2 className="font-headline-md text-headline-md text-on-background">Payment Details</h2>
            </div>
            <div className="p-lg border-2 border-dashed border-outline-variant/30 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-outline text-4xl">credit_card</span>
                <span className="material-symbols-outlined text-outline text-4xl">account_balance_wallet</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">Secure payment processing will be initialized in the next step.</p>
              <button type="button" className="font-button text-button px-gutter py-2 border border-outline text-on-surface rounded-full hover:bg-surface-container transition-colors">Select Payment Method</button>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 bg-surface-container-low p-gutter rounded-xl shadow-[0px_10px_40px_rgba(0,0,0,0.06)] border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-background mb-md">Your Order</h2>
            <div className="space-y-md mb-lg">
              
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center gap-md">
                  <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-outline-variant/20 flex-shrink-0">
                    <img className="w-full h-full object-cover" alt={item.nama} src={`http://localhost:5000${item.gambar}`}/>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-body-md text-body-md font-semibold text-on-background">{item.nama}</h3>
                    <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-body-md text-body-md font-medium text-on-background">Rp {(item.harga * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="border-t border-outline-variant/30 pt-md space-y-2">
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>Subtotal</span>
                  <span>Rp {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant font-body-md">
                  <span>Shipping</span>
                  <span className="text-primary-container font-semibold">Free</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-md pt-base border-t border-outline-variant/30">
              <span className="font-headline-md text-headline-md text-on-background">Total</span>
              <span className="font-headline-lg text-headline-lg text-primary">Rp {getCartTotal().toLocaleString()}</span>
            </div>
            
            <button type="submit" className="w-full bg-primary-container text-on-primary-container font-button text-button py-4 rounded-xl shadow-[0px_4px_20px_rgba(16,185,129,0.2)] hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              Place Order
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            
            <p className="text-center text-xs text-on-surface-variant mt-4">
              By placing your order, you agree to our 
              <Link className="underline ml-1" to="#">Terms of Service</Link>.
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
};

export default CheckoutPage;
