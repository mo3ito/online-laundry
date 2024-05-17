const express = require("express")
const router = express.Router();
const {customerRegistration} = require("../../controllers/customers/registration")

router.post("/customer/register" , customerRegistration )


module.exports = router