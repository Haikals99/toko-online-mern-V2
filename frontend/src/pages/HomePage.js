import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => setFeaturedProducts(data.slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="homepage">
      <div className="hero">
        <h1>Selamat Datang di TokoOnline</h1>
        <p>Temukan berbagai produk berkualitas dengan harga terbaik</p>
      </div>
      <section className="featured">
        <h2>Produk Unggulan</h2>
        <div className="products-flex">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;