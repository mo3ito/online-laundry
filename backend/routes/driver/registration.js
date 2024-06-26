const express = require("express");
const router = express.Router();
const {
  driverRegister,
  driverLogin,
} = require("../../controllers/driver/registration");
const { getAllOrders } = require("../../controllers/driver/orders");

router.post("/driver/register", driverRegister);
router.post("/driver/login", driverLogin);
router.get("/driver/get-all-orders", getAllOrders);

module.exports = router;
