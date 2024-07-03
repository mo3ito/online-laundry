const express = require("express");
const router = express.Router();
const {
  registerDryer,
  loginDryer,
} = require("../controllers/dryer/registration");
const { doneOrder, ordersForDryer } = require("../controllers/dryer/orders");

router.post("/dryer/register", registerDryer);
router.post("/dryer/login", loginDryer);
router.put("/dryer/done-order", doneOrder);
router.get("/dryer/orders-for-dryer", ordersForDryer);

module.exports = router;
