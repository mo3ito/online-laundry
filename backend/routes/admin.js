const express = require("express");
const router = express.Router();

const { adminRegister } = require("../controllers/admin/registration");
const { getAllDriver } = require("../controllers/admin/control");

router.post("/admin/register", adminRegister);
router.get("/admin/get-all-drivers", getAllDriver);

module.exports = router;
