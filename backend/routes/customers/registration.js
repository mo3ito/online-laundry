const express = require("express")
const router = express.Router();
const {customerRegistration , validationCustomers , checkRegister} = require("../../controllers/customers/registration")

router.post("/customers/validation" , validationCustomers )
router.post("/customers/check-register",checkRegister)
router.post("/customers/register" , customerRegistration )


module.exports = router