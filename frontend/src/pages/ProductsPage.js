import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Memuat produk...</div>;

  return (
    <div className="products-page">
      <h1>Semua Produk</h1>
      <div className="products-grid">
        {products.map(product => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductsPage;