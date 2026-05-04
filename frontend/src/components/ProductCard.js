import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // kita buat file CSS terpisah

const ProductCard = ({ product }) => {
  if (!product || !product.nama || !product.harga) {
    return null;
  }

  return (
    <div className="product-card">
      <img 
        src={`http://localhost:5000${product.gambar}`} 
        alt={product.nama} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
        />
      <div className="product-info">
        <h3 className="product-title">{product.nama}</h3>
        <p className="product-price">Rp {product.harga.toLocaleString()}</p>
        <Link to={`/produk/${product._id}`} className="btn-detail">Lihat Detail →</Link>
      </div>
    </div>
  );
};

export default ProductCard;