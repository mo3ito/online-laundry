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

    const ordersData = await OrdersModel.find(
      { customer_id: customerId },
      { orders: 1, _id: 0 }
    );
    const customer = await CustomersModel.findById(customerId);

    let desiredData = await ordersData.reduce(
      (acc, orderGroup) => acc.concat(orderGroup.orders),
      []
    );

    console.log(desiredData);

    const infos = {
      _id: customerId,
      name: customer.name,
      last_name: customer.last_name,
      phone_number: customer.phone_number,
      orders: desiredData,
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
