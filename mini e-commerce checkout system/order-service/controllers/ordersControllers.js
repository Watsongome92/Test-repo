const { createOrder, getOrderById } = require("../models/ordersModel");
const { successResponse, errorResponse } = require("../utils/response");

//POST /api/orders
function placeOrder(req, res) {
    const{ product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return errorResponse(res, "missing required fields: product_id and quantity missing", 400);    
    }

    const order = createOrder(product_id, quantity);
    return successResponse(res, "order created succesfully", order, 201);
}

//GET /api/orders/:orders_id
function getOrderStatus(req, res) {
    const orderId = parseInt(req.params.order_id);
    const order = getOrderById(orderId);

    if (!order) {
        return errorResponse(res, "order not found", 404);
    }

    //only return required info for integration
    return res.json({
        order_id: order.order_id,
        status: order.status
    });
}

module.exports = { placeOrder, getOrderStatus };