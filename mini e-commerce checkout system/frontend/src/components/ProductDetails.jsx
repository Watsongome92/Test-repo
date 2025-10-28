import React, { useState } from "react";

export default function ProductDetails({ product, onClose, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);

  //buying a single product immediately
  const handleBuyNow = () => {
    const order = {
      orderId: "Order-" + Math.floor(Math.random() * 10000),
      status: "PENDING",
      items: [{ ...product, quantity }],
      total: (product.price * quantity).toFixed(2)
    };
    onBuyNow(order);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="product-details">
          <img src={product.image} alt={product.name} className="product-img-large" />
          <h2>{product.name}</h2>
          <p className="desc">{product.description}</p>
          <h3>MWK{product.price.toFixed(2)}</h3>

          <div className="quantity-control">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="qty-btn"
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="qty-btn">
              +
            </button>
          </div>

          <div className="buy-now-total">
            <strong>Total: MWK{(product.price * quantity).toFixed(2)}</strong>
          </div>

          <div className="actions">
            <button
              className="btn secondary"
              onClick={() => {
                onAddToCart(product, quantity);
                onClose();
              }}
            >
              Add to Cart
            </button>
            <button className="btn primary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
