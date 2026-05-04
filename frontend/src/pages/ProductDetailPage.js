import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="loading-detail">Memuat detail produk...</div>;
  if (!product) return <div className="not-found">Produk tidak ditemukan</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
      <img 
  src={`http://localhost:5000${product.gambar}`} 
  alt={product.nama} 
  style={{ maxWidth: '400px' }} 
/>
        <div className="detail-info">
          <h1>{product.nama}</h1>
          <p className="detail-category">Kategori: {product.kategori}</p>
          <p className="detail-price">Rp {product.harga.toLocaleString()}</p>
          <p className="detail-description">{product.deskripsi}</p>
          <button className="btn-buy">Beli Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;