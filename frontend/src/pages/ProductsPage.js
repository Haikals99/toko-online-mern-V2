import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-gutter max-w-container-max mx-auto px-gutter w-full">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-lg">
          <section>
            <h3 className="font-headline-md text-headline-md mb-md">Category</h3>
            <div className="space-y-sm">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox"/>
                <span className="text-on-surface-variant group-hover:text-primary transition-colors">Semua Kategori</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox"/>
                <span className="text-on-surface-variant group-hover:text-primary transition-colors">Elektronik</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox"/>
                <span className="text-on-surface-variant group-hover:text-primary transition-colors">Pakaian</span>
              </label>
            </div>
          </section>
          <section>
            <h3 className="font-headline-md text-headline-md mb-md">Price Range</h3>
            <div className="px-2">
              <input className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" type="range"/>
              <div className="flex justify-between mt-sm text-label-sm-caps font-label-sm-caps text-outline">
                <span>Rp0</span>
                <span>Rp10jt+</span>
              </div>
            </div>
          </section>
          <section>
            <h3 className="font-headline-md text-headline-md mb-md">Rating</h3>
            <div className="space-y-sm">
              <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                <div className="flex text-primary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                </div>
                <span className="text-sm">& up</span>
              </button>
            </div>
          </section>
        </div>
      </aside>

      {/* Product Grid Area */}
      <section className="flex-grow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg gap-md">
          <h1 className="font-headline-lg text-headline-lg">All Products</h1>
          <div className="flex items-center gap-sm bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2">
            <span className="text-sm text-on-surface-variant">Sort By:</span>
            <select className="border-none bg-transparent focus:ring-0 text-sm font-semibold p-0 pr-8 cursor-pointer">
              <option>Newest</option>
              <option>Price: Low-High</option>
              <option>Price: High-Low</option>
              <option>Best Rated</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination (Extra Component) */}
        {!loading && products.length > 0 && (
          <div className="mt-xl flex justify-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;