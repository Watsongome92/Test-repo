const handlePayment = async () => {
  setIsProcessing(true);
  setError(null);
  
  try {
    // 1. First create the order
    const orderData = {
      items: order.items,
      total: parseFloat(order.total),
      customerInfo: {} // You can add customer info here later
    };

    const orderResult = await orderAPI.createOrder(orderData);
    
    // 2. Then process payment for the created order
    const paymentData = {
      orderId: orderResult.data.order_id, // Use the real order ID from order service
      amount: parseFloat(order.total),
      method: 'card',
      metadata: {
        items: order.items,
        itemCount: order.items.length
      }
    };

    const paymentResult = await paymentAPI.initiatePayment(paymentData);
    
    setPaymentStatus(paymentResult.status);
    
  } catch (err) {
    console.error('Payment error:', err);
    setError(err.message);
    setPaymentStatus('failed');
  } finally {
    setIsProcessing(false);
  }
};
