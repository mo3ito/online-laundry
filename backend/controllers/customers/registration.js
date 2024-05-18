const CustomersModel = require("../../models/customer/CustomerModel");
const CustomersAwaitingValidation = require("../../models/customer/validatePhoneNumbersModel");
const createToken = require("../../utils/createToken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const generateRandomCode = require("../../utils/generateRandomCode");
const sendSMS = require("../../utils/melipayamak");

CustomersAwaitingValidation;

const validationCustomers = async (req, res) => {
  const { phone_number } = req.body;

  try {
    const randomCode = await generateRandomCode();
    console.log(randomCode);

    let customerRecord = await CustomersAwaitingValidation.findOne({
      phone_number,
    });

    const conditionCustomer = {
      phone_number,
      is_register: customerRecord ? customerRecord.is_register : false,
      code_number: randomCode,
    };

    if (!customerRecord) {
      customerRecord = new CustomersAwaitingValidation(conditionCustomer);
    } else {
      customerRecord.is_register = conditionCustomer.is_register;
      customerRecord.code_number = conditionCustomer.code_number;
    }

    await customerRecord.save();

    const smsResponse = await sendSMS(phone_number, [randomCode]);
    const smsResponseParsed = await JSON.parse(smsResponse);
    console.log("SMS sent successfully:", smsResponse);

    if (
      (smsResponseParsed.status = "ارسال موفق بود" && smsResponseParsed.recId)
    ) {
      return res.status(200).json({
        message: "کد تایید برای شما ارسال شد",
      });
    } else {
      return res.status(400).json({
        message: "خطایی رخ داد دوباره تلاش کنید",
      });
    }
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const checkRegister = async (req, res) => {
  const { code_number } = req.body;

  try {
    const customer = await CustomersAwaitingValidation.findOne({ code_number });

    if (customer) {
      const { code_number, ...customerWithoutCodeNumber } = customer.toObject();
      return res.status(200).json(customerWithoutCodeNumber);
    } else {
      return res.status(200).json({
        compare_code: false,
      });
    }
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};




const customerRegistration = async (req, res) => {
  const { phone_number, name, last_name } = req.body;

  try {
    let customer = await CustomersAwaitingValidation.findOne({ phone_number });

    if (!customer) {
      return res.status(400).json({
        message: "مشتری با این مشخصات یافت نشد",
      });
    }

    const customerInfos = {
      name,
      last_name,
      phone_number,
    };

    const token = await createToken(customerInfos)

    const newCustomer = new CustomersModel(customerInfos);
    await newCustomer.save();

    customer.is_register = true;
    await customer.save();

    res.status(200).json({ customerInfos , token });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


module.exports = { customerRegistration, validationCustomers, checkRegister };
