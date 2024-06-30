const express = require("express");
const router = express.Router();
const {
  driverRegister,
  driverLogin,
} = require("../controllers/driver/registration");
const {
  getAllOrdersIsNotDone,
  getAlOrdersIsDone,
  payOrdersMoney,
} = require("../controllers/driver/orders");

router.post("/driver/register", driverRegister);
router.post("/driver/login", driverLogin);
router.get("/driver/get-all-orders-is-not-done", getAllOrdersIsNotDone);
router.get("/driver/get-all-orders-is-done", getAlOrdersIsDone);
router.post("/driver/pay-orders-money", payOrdersMoney);

module.exports = router;
