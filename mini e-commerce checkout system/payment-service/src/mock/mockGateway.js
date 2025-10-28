// src/mock/mockGateway.js
export const processPayment = async (amount, method) => {
  console.log(`💳 Mock processing: $${amount} via ${method}`);

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Randomized outcome (80% success, 20% fail)
  const success = Math.random() > 0.2;

  if (success) {
    return {
      status: 'success',
      transactionId: `TXN-${Date.now()}`,
      message: 'Payment processed successfully',
    };
  } else {
    return {
      status: 'failed',
      error: 'Payment could not be completed (mock failure)',
    };
  }
};
