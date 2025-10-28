import React from "react";

export default function ProductCard({ product, onView }) {
  return (
    <div className="product-card" onClick={onView}>
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>MWK{product.price.toFixed(2)}</p>
      <span className="category-tag">{product.category}</span>
    </div>
  );
}