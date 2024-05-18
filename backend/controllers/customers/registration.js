const CustomersModel = require("../../models/customer/CustomerModel");
const ValidatePhoneNumberCustomers = require("../../models/customer/validatePhoneNumbersModel")
const createToken = require("../../utils/createToken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const generateRandomCode = require("../../utils/generateRandomCode")
const sendSMS = require('../../utils/melipayamak')


const validationCustomers = async (req, res) => {
  const { phone_number } = req.body;

  try {
    const randomCode = await generateRandomCode();
    console.log(randomCode);

    let customerRecord = await ValidatePhoneNumberCustomers.findOne({ phone_number });

    const conditionCustomer = {
      phone_number,
      is_register: customerRecord ? customerRecord.is_register : false,
      codeNumber: randomCode
    };

    if (!customerRecord) {
      customerRecord = new ValidatePhoneNumberCustomers(conditionCustomer);
    } else {
      customerRecord.is_register = conditionCustomer.is_register;
      customerRecord.codeNumber = conditionCustomer.codeNumber;
    }

    await customerRecord.save();

    const smsResponse = await sendSMS(phone_number, [randomCode]);
    const smsResponseParsed = await JSON.parse(smsResponse)
    console.log('SMS sent successfully:', smsResponse);

    if (smsResponseParsed.status = "ارسال موفق بود" &&  smsResponseParsed.recId) {
      return res.status(200).json({
        message: "کد تایید برای شما ارسال شد"
      });
    } else {
      return res.status(400).json({
        message: "خطایی رخ داد دوباره تلاش کنید"
      });
    }
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد"
    });
  }
};


const customerRegistration = async (req, res) => {
  const { phone_number } = req.body;

  try {



    const phoneNumber = await CustomersModel.findOne({phone_number})

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password", salt.toString());

    const customerInfos = {
      name,
      last_name,
      phone_number,
      password: hashedPassword,
    };

    const newCustomer = new CustomersModel(customerInfos);
    await newCustomer.save();
    res.status(200).json({ customerInfos });
  } catch (error) {
    console.error("error:", error.message);
  }
};

module.exports = { customerRegistration , validationCustomers };
