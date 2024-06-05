const express = require("express");
const router = express.Router();
const {
  customerRegistration,
  validationCustomers,
  verifyCode,
  validationForLogin,
  customerLogin,
} = require("../../controllers/customers/registration");

router.post("/customers/validation", validationCustomers);
router.post("/customers/vrify-code", verifyCode);
router.post("/customers/register", customerRegistration);
router.post("/customers/validation-for-login", validationForLogin);
router.post("/customers/login", customerLogin);

module.exports = router;
