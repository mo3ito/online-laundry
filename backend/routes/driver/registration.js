const express = require("express");
const router = express.Router();
const { driverRegister } = require("../../controllers/driver/registration");

router.post("/driver/register", driverRegister);

module.exports = router;
