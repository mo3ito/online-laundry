const express = require("express");
const router = express.Router();
const {
  sendOrders,
  getOrdersCustomer,
  deleteOrders,
} = require("../controllers/orders/orders");

router.post("/orders/send-orders", sendOrders);
router.get("/orders/get-orders-customer", getOrdersCustomer);
router.put("/orders/delete-order", deleteOrders);

module.exports = router;
