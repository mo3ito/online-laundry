const express = require("express");
const router = express.Router();
const { registerDryer , loginDryer  } = require("../../controllers/dryer/registration");

router.post("/dryer/register", registerDryer);
router.post("/dryer/login", loginDryer);


module.exports = router;
