const express = require("express");
const router = express.Router();

const {
  adminRegister,
  adminLogin,
} = require("../controllers/admin/registration");
const { getAllDriver } = require("../controllers/admin/control");

router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/get-all-drivers", getAllDriver);

module.exports = router;
