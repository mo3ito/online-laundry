const express = require("express");
const router = express.Router();
const {
  driverRegister,
  driverLogin,
  editInformation,
  getAllDriver
} = require("../controllers/driver/registration");
const {
  getAllOrdersIsNotDone,
  getAlOrdersIsDone,
  payOrdersMoney,
  getOrdersFromCustomer,
} = require("../controllers/driver/orders");

router.post("/driver/register", driverRegister);
router.post("/driver/login", driverLogin);
router.put("/driver/edit-information", editInformation);
router.get("/driver/get-all-orders-is-not-done", getAllOrdersIsNotDone);
router.get("/driver/get-all-orders-is-done", getAlOrdersIsDone);
router.put("/driver/pay-orders-money", payOrdersMoney);
router.put("/driver/get-orders-from-customer", getOrdersFromCustomer);
router.get("/driver/get-all-driver", getAllDriver);

module.exports = router;
