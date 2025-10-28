// src/controllers/paymentController.js
import { processPayment } from '../mock/mockGateway.js';

export const initiatePayment = async (req, res) => {
  try {
    const { orderId, amount, method } = req.body;

    if (!orderId || !amount || !method) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: orderId, amount, method',
      });
    }

    const result = await processPayment(amount, method);

    res.status(200).json({
      orderId,
      ...result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      details: err.message,
    });
  }
};
