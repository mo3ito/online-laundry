const OrdersModel = require("../../models/orders/Orders");
const CustomersModel = require("../../models/customer/CustomerModel");
const createToken = require("../../utils/createToken");
const JDate = require("jalali-date");

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

    const jdate = new JDate();
    const formatedDate = jdate.date.join("/");

    console.log(formatedDate);

    const ordersInfos = {
      customer_id: customerId,
      name,
      last_name,
      phone_number,
      orders: orders.map((order) => ({
        ...order,
        created_at: formatedDate,
        address,
      })),
      address,
      latitude,
      longitude,
    };

    const newOrdersModel = await new OrdersModel(ordersInfos);

    await newOrdersModel.save();

    res.status(200).json({
      message: "سفارش با موفقیت ثبت شد",
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

    const customer = await CustomersModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({
        message: "مشتری با این آیدی وجود ندارد",
      });
    }

    const orders = await OrdersModel.find({ customer_id: customerId });

    const allOrders = orders.flatMap((order) => order.orders);
    const sortedAllOrders = allOrders.toReversed();
    return res.status(200).json(sortedAllOrders);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const deleteOrders = async (req, res) => {
  const customerId = req.headers.authorization;
  const { orders_id } = req.body;

  try {
    const customer = await CustomersModel.findById(customerId);
    if (!customer) {
      return res.status(400).json({
        message: "مشتری با چنین آیدی وجود ندارد",
      });
    }

    const ordersUpdateResult = await OrdersModel.updateMany(
      { customer_id: customerId },
      { $pull: { orders: { orders_id } } }
    );

    if (ordersUpdateResult.modifiedCount === 0) {
      return res.status(404).json({
        message: "سفارش یافت نشد",
      });
    }

    await OrdersModel.deleteMany({
      customer_id: customerId,
      orders: { $size: 0 },
    });

    return res.status(200).json({
      message: "سفارش با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

module.exports = { sendOrders, getOrdersCustomer, deleteOrders };
