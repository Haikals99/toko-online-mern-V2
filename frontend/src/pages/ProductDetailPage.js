import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { CartContext } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
    </div>
  );
  
  if (!product) return (
    <div className="flex justify-center items-center min-h-[50vh] flex-col">
      <span className="material-symbols-outlined text-error text-6xl mb-4">error</span>
      <h2 className="font-headline-md text-headline-md">Produk tidak ditemukan</h2>
      <Link to="/produk" className="mt-4 text-primary font-button hover:underline">Kembali ke Produk</Link>
    </div>
  );

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl mt-lg px-gutter max-w-container-max mx-auto mb-xl">
        {/* Left: Image Gallery (Asymmetric Bento-ish Layout) */}
        <div className="lg:col-span-7 space-y-gutter">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container shadow-sm group">
            <img alt={product.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={`https://toko-online-mern-v2-production.up.railway.app${product.gambar}`} />
          </div>
          <div className="grid grid-cols-2 gap-gutter">
            <div className="aspect-square rounded-xl overflow-hidden bg-surface-container">
              <img alt="Detail 1" className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" src={`https://toko-online-mern-v2-production.up.railway.app${product.gambar}`} />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-surface-container">
              <img alt="Detail 2" className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" src={`https://toko-online-mern-v2-production.up.railway.app${product.gambar}`} />
            </div>
          </div>
        </div>

        {/* Right: Product Information */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-32 h-fit">
          <nav className="flex items-center gap-xs text-on-surface-variant font-label-sm-caps mb-sm">
            <Link to="/produk" className="hover:text-primary">Products</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>{product.kategori}</span>
          </nav>
          <h1 className="font-headline-xl text-headline-xl text-on-background mb-xs">{product.nama}</h1>
          <div className="flex items-center gap-sm mb-lg">
            <span className="font-headline-lg text-headline-lg text-primary-container">Rp {product.harga.toLocaleString()}</span>
            <span className="bg-secondary-container text-on-secondary-container px-base py-xs rounded font-label-sm-caps">Stock Ready</span>
          </div>
          <div className="space-y-md border-y border-outline-variant/30 py-lg mb-lg">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {product.deskripsi || "Detail produk belum tersedia."}
            </p>
          </div>
          
          <div className="flex flex-col gap-gutter">
            <div className="flex items-center gap-gutter">
              <div className="flex-1">
                <span className="font-label-sm-caps block mb-base">Quantity</span>
                <div className="flex items-center justify-between border border-outline-variant rounded-lg px-gutter py-3">
                  <button onClick={decrement} className="material-symbols-outlined text-on-surface-variant hover:text-primary">remove</button>
                  <span className="font-body-md font-semibold">{quantity}</span>
                  <button onClick={increment} className="material-symbols-outlined text-on-surface-variant hover:text-primary">add</button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                const user = localStorage.getItem('user');
                if (!user) {
                  alert('Silakan login terlebih dahulu untuk mulai berbelanja!');
                  navigate('/login');
                  return;
                }
                addToCart(product, quantity);
                alert('Berhasil ditambahkan ke keranjang!');
              }}
              className="w-full bg-primary text-on-primary font-button text-button py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-sm">
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
            <div className="flex items-center justify-between text-on-surface-variant px-base mt-sm">
                <button className="flex items-center gap-xs hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                    <span className="text-sm font-medium">Add to Wishlist</span>
                </button>
                <button className="flex items-center gap-xs hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-sm">share</span>
                    <span className="text-sm font-medium">Share</span>
                </button>
            </div>
          </div>
          <div className="mt-xl grid grid-cols-2 gap-gutter border-t border-outline-variant/30 pt-lg">
              <div className="flex flex-col gap-xs">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  <span className="font-button text-button">Fast Shipping</span>
                  <span className="text-xs text-on-surface-variant">2-4 business days</span>
              </div>
              <div className="flex flex-col gap-xs">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <span className="font-button text-button">Original Guarantee</span>
                  <span className="text-xs text-on-surface-variant">100% Authentic Product</span>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;