const CustomerModel = require("../../models/customer/CustomerModel");
const createToken = require("../../utils/createToken")


const customerRegistration = async (req, res) => {

  const { name, last_name, phone_number } = req.body;

  try {
    const newCustomer = new CustomerModel({ name, last_name, phone_number });
    await newCustomer.save();

    res.status(200).json({
      message: "ثبت‌نام شما با موفقیت انجام شد",
    });
  } catch (error) {
    console.error("error:", error.message);
  }
};

module.exports = { customerRegistration };
