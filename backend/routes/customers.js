const express = require("express");
const router = express.Router();
const {
  customerRegistration,
  validationCustomers,
  verifyCode,
  editInformation,
} = require("../controllers/customers/registration");

router.post("/customers/validation", validationCustomers);
router.post("/customers/vrify-code", verifyCode);
router.post("/customers/register", customerRegistration);
router.put("/customers/edit-information", editInformation);

module.exports = router;
