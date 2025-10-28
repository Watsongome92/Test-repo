//temporary in memory array as the database
const orders = [];

//functions to interact with the database
function createOrder(product_id, quantity) {
    const order = {
        orders_id: orders.length + 1,
        product_id,
        quantity,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    orders.push(order);
    return order;
}

function getOrderById(order_id) {
    return orders.find(order => order.order_id === order_id);
}

module.exports = { createOrder, getOrderById };