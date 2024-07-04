const express = require("express");
const router = express.Router();
const {
  registerDryer,
  loginDryer,
} = require("../controllers/dryer/registration");
const {
  doneOrder,
  ordersForDryer,
  doneOrdersByDryer,
} = require("../controllers/dryer/orders");

router.post("/dryer/register", registerDryer);
router.post("/dryer/login", loginDryer);
router.put("/dryer/done-order", doneOrder);
router.get("/dryer/orders-for-dryer", ordersForDryer);
router.get("/dryer/done-orders-by-dryer", doneOrdersByDryer);

module.exports = router;
