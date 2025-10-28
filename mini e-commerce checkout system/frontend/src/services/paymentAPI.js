import axios from 'axios';

const API_BASE_URL = '/api/payment';

const paymentAPI = {
  // Initiate payment
  async initiatePayment(paymentData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/initiate`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await axios.get(`http://payment-service:5000/`);
      return response.data;
    } catch (error) {
      console.error('Payment service health check failed:', error);
      throw error;
    }
  }
};

export default paymentAPI;