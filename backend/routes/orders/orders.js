const express = require("express");
const router = express.Router();
const {
  sendOrders,
  getOrdersCustomer,
} = require("../../controllers/orders/orders");

router.post("/orders/send-orders", sendOrders);
router.get("/orders/get-orders-customer", getOrdersCustomer);

module.exports = router;
