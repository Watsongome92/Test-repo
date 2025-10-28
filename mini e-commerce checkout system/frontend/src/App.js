import React, { useState, useCallback, useMemo } from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CartModal from "./components/CartModal";
import Payment from "./components/Payment";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [order, setOrder] = useState(null);

  const categories = ["All", "Electronics", "Fashion", "Home", "Books", "Sports"];

  const handleAddToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  }, []);

  const handleBuyNow = useCallback((orderData) => {
    setOrder(orderData);
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter((item) => item.id !== productId));
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    else{
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    }
  }, [handleRemoveFromCart]);

  //updates the number of items in the cart
  const cartItemCount = useMemo(() => 
    cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  //updates the total price of items in the cart
  const cartTotalAmount = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2),
    [cartItems]
  );

  //handling check out process from the cart
  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;
    else{
    const orderData = { 
      orderId: "Order-" + Math.floor(Math.random() * 10000), 
      status: "PENDING",
      items: [...cartItems],
      total: cartTotalAmount
    };
    setOrder(orderData);
    setCartItems([]);
    setShowCart(false);}
  }, [cartItems, cartTotalAmount]);

  return (
    <div className="App">
      <header className="header">
        <h1>🛍️ MyShop</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </header>

      {/* Category Bar */}
      <div className="category-bar">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <main className="main-content">
        <ProductList
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onViewProduct={setSelectedProduct}
        />
      </main>

      {/* Floating Shopping Cart */}
      <div className="floating-cart" onClick={() => setShowCart(true)}>
        🛒
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {showCart && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          total={cartTotalAmount}
        />
      )}

      {order && (
        <Payment order={order} onClose={() => setOrder(null)} />
      )}

      <footer className="footer">
        <p>&copy; 2024 MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
}