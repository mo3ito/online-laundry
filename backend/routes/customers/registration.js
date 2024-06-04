const express = require("express")
const router = express.Router();
const {customerRegistration , validationCustomers , verifyCode} = require("../../controllers/customers/registration")

router.post("/customers/validation" , validationCustomers )
router.post("/customers/vrify-code",verifyCode)
router.post("/customers/register" , customerRegistration )


module.exports = router