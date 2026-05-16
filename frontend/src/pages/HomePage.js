import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://toko-online-mern-v2-production.up.railway.app/api/produk')
      .then(res => {
         const products = res.data;
         const featured = products.filter(p => p.isFeatured);
         if (featured.length > 0) {
           setFeaturedProducts(featured.slice(0, 4));
         } else {
           setFeaturedProducts(products.slice(0, 4));
         }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-lowest py-xl">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-lg items-center">
          <div className="z-10">
            <span className="inline-block mb-md px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm-caps text-label-sm-caps">NEW COLLECTION</span>
            <h1 className="font-headline-xl text-headline-xl mb-md text-on-background">Modern Essentials for Your Lifestyle</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-lg">
              Elevate your everyday experience with curated tech accessories and premium homeware designed for the contemporary professional.
            </p>
            <div className="flex flex-wrap gap-md">
              <Link to="/produk" className="px-lg py-4 bg-primary-container text-on-primary-container font-button text-button rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-base">
                Shop Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link to="/produk" className="px-lg py-4 border border-outline-variant text-on-surface font-button text-button rounded-xl hover:bg-surface-container-low active:scale-95 transition-all">
                View Lookbook
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl transform rotate-2">
              <img alt="Modern tech display" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBecbpLtXcCavR8ZZA0jUv8Z2V35NCFp3cmHH5_CHjYMNuHQgDr88iN1PBf5YgphjEYTp-Ye6o2JS4oHHgoGyMvPJVjwRv6PPcyvE1Z7wx5sE6a_OpBpPjUhxWlrOpnN135UyUwNIUMFlKpPNkX4dlCIf1a9cglecOxeuTxT1RP7djfUYoviQLFKFaAmU-XhGL3zhkrq3oz8oy_yJPbmmj5UiUgxPlsRmjrRnc7KgzLvFoNbyx8rx13vHQLelQKUxDtqELAYMelQRs" />
            </div>
            <div className="absolute -bottom-base -left-base bg-white p-sm rounded-xl shadow-lg border border-outline-variant/30 hidden md:block">
              <div className="flex items-center gap-sm">
                <div className="w-12 h-12 rounded-lg bg-primary-fixed-dim flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <div>
                  <p className="font-button text-button font-bold">Premium Quality</p>
                  <p className="text-[12px] text-on-surface-variant">Lifetime Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="py-lg bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-wrap justify-center gap-xl md:justify-between items-center">
            <Link to="/produk" className="flex flex-col items-center gap-sm group cursor-pointer text-decoration-none">
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container text-[32px]">devices</span>
              </div>
              <span className="font-button text-button text-on-surface">Electronics</span>
            </Link>
            <Link to="/produk" className="flex flex-col items-center gap-sm group cursor-pointer text-decoration-none">
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container text-[32px]">apparel</span>
              </div>
              <span className="font-button text-button text-on-surface">Fashion</span>
            </Link>
            <Link to="/produk" className="flex flex-col items-center gap-sm group cursor-pointer text-decoration-none">
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container text-[32px]">home</span>
              </div>
              <span className="font-button text-button text-on-surface">Home</span>
            </Link>
            <Link to="/produk" className="flex flex-col items-center gap-sm group cursor-pointer text-decoration-none">
              <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-primary group-hover:text-on-primary-container text-[32px]">self_care</span>
              </div>
              <span className="font-button text-button text-on-surface">Wellness</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">Produk Unggulan</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Koleksi produk terbaik pilihan kami</p>
            </div>
            <Link to="/produk" className="text-primary font-button text-button border-b border-primary hover:opacity-80 transition-all">Browse all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            
            {featuredProducts.map(product => (
              <div key={product._id} className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                <div className="aspect-square relative overflow-hidden bg-surface-container-high">
                  <img alt={product.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.gambar} />
                  <div className="opacity-0 translate-y-4 absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link to={`/produk/${product._id}`} className="px-6 py-3 bg-white text-on-background font-button text-button rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-all">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-md flex flex-col flex-grow">
                  <p className="font-label-sm-caps text-label-sm-caps text-primary mb-xs uppercase">{product.kategori || 'ELECTRONICS'}</p>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-base group-hover:text-primary transition-colors line-clamp-1">{product.nama}</h3>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="font-headline-md text-headline-md font-bold">Rp {product.harga.toLocaleString()}</p>
                    <button 
                      onClick={() => {
                        const user = localStorage.getItem('user');
                        if (!user) {
                          alert('Silakan login terlebih dahulu untuk mulai berbelanja!');
                          navigate('/login');
                          return;
                        }
                        addToCart(product, 1);
                        alert('Berhasil ditambahkan ke keranjang!');
                      }} 
                      className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary-container hover:border-primary-container transition-all text-on-surface cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-xl bg-primary text-on-primary">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-lg">
          <div className="md:max-w-xl text-center md:text-left">
            <h2 className="font-headline-lg text-headline-lg mb-base">Join the Modern Community</h2>
            <p className="font-body-md text-body-md opacity-90">Subscribe to get early access to new drops, design tips, and exclusive offers delivered to your inbox.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-base">
            <input className="px-md py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 min-w-[300px]" placeholder="Enter your email" type="email" />
            <button className="px-lg py-4 bg-primary-fixed text-on-primary-fixed font-button text-button rounded-xl hover:opacity-90 active:scale-95 transition-all">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;