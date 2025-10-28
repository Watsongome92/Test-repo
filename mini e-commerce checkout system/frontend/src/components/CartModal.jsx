import React from "react";

export default function CartModal({ 
  cartItems, 
  onClose, 
  onCheckout, 
  onUpdateQuantity, 
  onRemoveItem,
  total 
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty</p>
            <small>Add some products to get started!</small>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                    <div className="quantity-control">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="remove-btn">🗑️</button>
                </li>
              ))}
            </ul>
            
            <div className="cart-summary">
              <h3>Total: MWK{total}</h3>
              <button className="btn primary" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
