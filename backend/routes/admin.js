const express = require("express");
const router = express.Router();

const {
  adminRegister,
  adminLogin,
} = require("../controllers/admin/registration");
const {
  getAllDriver,
  verifyDriver,
  deleteDriver,
  getAlcustomers,
  paidOrders,
} = require("../controllers/admin/control");

router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/get-all-drivers", getAllDriver);
router.put("/admin/verify-driver", verifyDriver);
router.delete("/admin/delete-driver", deleteDriver);
router.get("/admin/get-all-customers", getAlcustomers);
router.get("/admin/paid-orders", paidOrders);
module.exports = router;
