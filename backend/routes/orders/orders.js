const express = require("express");
const router = express.Router();
const { sendOrders } = require("../../controllers/orders/orders");

router.post("/orders/send-orders", sendOrders);

module.exports = router;
