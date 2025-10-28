import axios from 'axios';

const API_BASE_URL = '/api/orders';

const orderAPI = {
  // Create new order
  async createOrder(orderData) {
    try {
      const response = await axios.post(API_BASE_URL, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order status
  async getOrderStatus(orderId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order status:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await axios.get(`http://order-service:5001/health`);
      return response.data;
    } catch (error) {
      console.error('Order service health check failed:', error);
      throw error;
    }
  }
};

export default orderAPI;