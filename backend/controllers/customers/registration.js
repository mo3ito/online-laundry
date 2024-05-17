
const CustomerModel = require("../../models/customer/CustomerModel")

const customerRegistration = async (req , res)=>{

    const {name , last_name ,phoneNumber} = req.body

    try {
        
       const newCustomer = new CustomerModel({name , last_name ,phoneNumber})
       await newCustomer.save()

       res.status(200).json({
        message:"ثبت‌نام شما با موفقیت انجام شد"
       })

    } catch (error) {
        console.error('error:',error.message)
    }

}

module.exports = {customerRegistration}