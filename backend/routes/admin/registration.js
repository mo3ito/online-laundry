const express = require("express");
const router = express.Router();

const { adminRegister } = require("../../controllers/admin/registration");

router.post("/admin/register", adminRegister);

module.exports = router;
