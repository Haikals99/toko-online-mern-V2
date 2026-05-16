import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product || !product.nama || !product.harga) {
    return null;
  }

  return (
    <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="aspect-square relative overflow-hidden bg-surface-container">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={product.gambar} 
          alt={product.nama}
        />
        <div className="opacity-0 translate-y-4 absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Link to={`/produk/${product._id}`} className="px-6 py-3 bg-white text-on-background font-button text-button rounded-full shadow-lg hover:bg-primary hover:text-on-primary transition-all">
            View Details
          </Link>
        </div>
      </div>
      <div className="p-md flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-xs gap-sm">
          <h3 className="font-headline-md text-headline-md line-clamp-1 flex-grow" title={product.nama}>{product.nama}</h3>
          <span className="text-primary font-bold whitespace-nowrap">Rp {product.harga.toLocaleString()}</span>
        </div>
        <p className="text-on-surface-variant text-sm line-clamp-2 mb-sm flex-grow">
          {product.deskripsi || 'Produk berkualitas dari TokoOnline.'}
        </p>
        <div className="flex items-center gap-1 mt-auto">
          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xs font-semibold">4.9</span>
          <span className="text-xs text-outline">(124 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;