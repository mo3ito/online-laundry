const CustomersModel = require("../../models/customer/CustomerModel");
const CustomersAwaitingValidation = require("../../models/customer/validatePhoneNumbersModel");
const OrdersModel = require("../../models/orders/Orders");
const createToken = require("../../utils/createToken");
require("dotenv").config();
const generateRandomCode = require("../../utils/generateRandomCode");
const sendSMS = require("../../utils/melipayamak");

const validationCustomers = async (req, res) => {
  const { phone_number } = req.body;

  try {
    if (phone_number.length !== 11) {
      return res.status(400).json({
        message: "تعداد کاراکترهای شماره موبایل صحیح نمی‌باشد",
      });
    }
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
      message: error,
    });
  }
};

const verifyCode = async (req, res) => {
  const { code_number } = req.body;

  try {
    const customer = await CustomersAwaitingValidation.findOne({ code_number });

    if (customer) {
      const { code_number, ...customerWithoutCodeNumber } = customer.toObject();
      await CustomersAwaitingValidation.updateOne(
        { _id: customer._id },
        { $unset: { code_number: "" } }
      );

      if (customerWithoutCodeNumber) {
        const customerRegistered = await CustomersModel.findOne({
          phone_number: customerWithoutCodeNumber.phone_number,
        });

        if (!customerRegistered) {
          return res.status(200).json(customerWithoutCodeNumber);
        } else {
          const token = await createToken({ infos: customerRegistered });
          res.status(200).json({
            infos: customerRegistered,
            token,
          });
        }
      }
    } else {
      return res.status(400).json({
        message: "کد وارد شده صحیح نمی‌باشد",
      });
    }
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error,
    });
  }
};

const customerRegistration = async (req, res) => {
  const { phone_number, name, last_name } = req.body;

  try {
    let customer = await CustomersAwaitingValidation.findOne({ phone_number });
    let isCustomerRegisterBefore = await CustomersModel.findOne({
      phone_number,
    });

    if (!customer) {
      return res.status(400).json({
        message: "شماره موبایل وارد شده صحیح نمی‌باشد",
      });
    }

    if (isCustomerRegisterBefore) {
      return res.status(400).json({
        message: "این مشتری قبلا ثبت‌نام کرده است",
      });
    }

    const customerInfos = {
      name,
      last_name,
      phone_number,
    };

    const newCustomer = new CustomersModel(customerInfos);
    await newCustomer.save();

    const token = await createToken({ infos: newCustomer });
    customer.is_register = true;
    await customer.save();

    res.status(200).json({ infos: newCustomer, token });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


const editInformation = async (req, res) => {
  const customerId = req.headers.authorization;
  const { name, last_name } = req.body;

  try {
    
    if (!name.trim() || !last_name.trim()) {
      return res.status(400).json({
        message: "مقادیر ورودی خالی هستند",
      });
    }

    const customer = await CustomersModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({
        message: "مشتری با این آیدی وجود ندارد",
      });
    }

    customer.name = name;
    customer.last_name = last_name;
    await customer.save();

    const orders = await OrdersModel.find({ customer_id: customerId });

    await Promise.all(
      orders.map(async (order) => {
        order.name = name;
        order.last_name = last_name;
        await order.save();
      })
    );

    const token = await createToken({ infos: customer });

    return res.status(200).json({
      infos: customer,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

module.exports = {
  customerRegistration,
  validationCustomers,
  verifyCode,
  editInformation,
};
