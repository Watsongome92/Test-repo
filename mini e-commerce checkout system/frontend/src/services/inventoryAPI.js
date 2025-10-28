import axios from 'axios';

const API_BASE_URL = '/api/inventory';

const inventoryAPI = {
  // Get all products
  async getAllProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Reserve product quantity
  async reserveQuantity(productId, quantity) {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory/reserve`, {
        product_id: productId,
        quantity: quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error reserving product:', error);
      throw error;
    }
  },

  // Create product (admin function)
  async createProduct(productData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/inventory`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
};

export default inventoryAPI;