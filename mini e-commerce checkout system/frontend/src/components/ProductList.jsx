import React, { useMemo, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import inventoryAPI from "../services/inventoryAPI";

export default function ProductList({ searchTerm, selectedCategory, onViewProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await inventoryAPI.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if API fails
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || p.category === selectedCategory)
    );
  }, [products, searchTerm, selectedCategory]);

  if (loading) {
    return <div className="no-products">Loading products...</div>;
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onView={() => onViewProduct(product)} 
        />
      ))}
    </div>
  );
}