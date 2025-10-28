const express = require("express");
const router = express.Router();
const { placeOrder, getOrderStatus } = require("../controllers/ordersControllers");

router.post("/", placeOrder);
router.get("/:order_id", getOrderStatus);

module.exports = router;