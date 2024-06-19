const OrdersModel = require("../../models/orders/Orders");
const CustomersModel = require("../../models/customer/CustomerModel");
const createToken = require("../../utils/createToken");

const sendOrders = async (req, res) => {
  const customerId = req.headers.authorization;

  const {
    name,
    last_name,
    phone_number,
    orders,
    address,
    latitude,
    longitude,
  } = req.body;


  console.log(orders);
  try {
    const customer = await CustomersModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({
        message: "مشتری با چنین آیدی وجود ندارد",
      });
    }

    if (
      !name &&
      !last_name &&
      phone_number &&
      !orders &&
      !latitude &&
      !longitude
    ) {
      return res.status(400).json({
        message: "لطفا همه‌ی فیلدهای مورد نیاز را پر کنید",
      });
    }

    const ordersInfos = {
      customer_id: customerId,
      name,
      last_name,
      phone_number,
      orders,
      address,
      latitude,
      longitude,
    };

    const newOrdersModel = await new OrdersModel(ordersInfos);

    await newOrdersModel.save();

    customer.orders.push(...ordersInfos.orders);
    await customer.save();

    res.status(200).json({
      message: "سفارش با موفقیت ثبت شد",
      ordersInfo: newOrdersModel,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const getOrdersCustomer = async (req, res) => {
  const customerId = req.headers.authorization;

  try {
    if (!customerId) {
      return res.status(400).json({
        message: "آیدی مشتری وارد نشده است",
      });
    }

   const customer = await CustomersModel.findById(customerId)

   console.log(customer);
    const infos = {
      _id: customerId,
      name: customer.name,
      last_name: customer.last_name,
      phone_number: customer.phone_number,
      orders: customer.orders,
      created_at:customer.created_at
    };

    const token = await createToken(infos);

 

    return res.status(200).json({
      infos,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

module.exports = { sendOrders, getOrdersCustomer };
