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

    const customer = await CustomersModel.findById(customerId);

    console.log(customer);
    const infos = {
      _id: customerId,
      name: customer.name,
      last_name: customer.last_name,
      phone_number: customer.phone_number,
      orders: customer.orders,
      created_at: customer.created_at,
      is_customer: customer.is_customer
    };

    const token = await createToken({ infos });

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

// const deleteOrders = async (req, res) => {
//   const customerId = req.headers.authorization;
//   const { orders_id } = req.body;

//   try {
//     const customer = await CustomersModel.findById(customerId);
//     const orders = await OrdersModel.findOne({ customer_id: customerId });

//     if (!customer) {
//       return res.status(400).json({
//         message: "مشتری با چنین آیدی وجود ندارد",
//       });
//     }
//     if (!orders) {
//       return res.status(400).json({
//         message: "سفارشی با چنین آیدی مشتری وجود ندارد ",
//       });
//     }

//     const ordersUpdateResult = await OrdersModel.updateOne(
//       { customer_id: customerId },
//       { $pull: { orders: { orders_id } } }
//     );

//     const customerUpdateResult = await CustomersModel.updateOne(
//       { _id: customerId },
//       { $pull: { orders: { orders_id } } }
//     );

//     if (
//       ordersUpdateResult.modifiedCount === 0 &&
//       customerUpdateResult.modifiedCount === 0
//     ) {
//       return res.status(404).json({
//         message: "سفارش یافت نشد",
//       });
//     }

//     const updatedCustomer = await CustomersModel.findById(customerId);

//     if (updatedCustomer.orders.length === 0) {
//       await orders.deleteOne({ customer_id: customerId });
//     }

//     const token = await createToken({ infos: updatedCustomer });

//     return res.status(200).json({
//       infos: updatedCustomer,
//       token,
//     });
//   } catch (error) {
//     console.error("error:", error.message);
//     return res.status(500).json({
//       message: "خطایی رخ داد",
//     });
//   }
// };

const deleteOrders = async (req, res) => {
  const customerId = req.headers.authorization;
  const { orders_id } = req.body;

  try {
    const customer = await CustomersModel.findById(customerId);
    const orders = await OrdersModel.findOne({ customer_id: customerId });

    if (!customer) {
      return res.status(400).json({
        message: "مشتری با چنین آیدی وجود ندارد",
      });
    }
    if (!orders) {
      return res.status(400).json({
        message: "سفارشی با چنین آیدی مشتری وجود ندارد ",
      });
    }

    const ordersUpdateResult = await OrdersModel.updateOne(
      { customer_id: customerId },
      { $pull: { orders: { orders_id } } }
    );

    const customerUpdateResult = await CustomersModel.updateOne(
      { _id: customerId },
      { $pull: { orders: { orders_id } } }
    );

    if (
      ordersUpdateResult.modifiedCount === 0 &&
      customerUpdateResult.modifiedCount === 0
    ) {
      return res.status(404).json({
        message: "سفارش یافت نشد",
      });
    }

    const updatedCustomer = await CustomersModel.findById(customerId);

    if (updatedCustomer.orders.length === 0) {
      let result;
      do {
        result = await OrdersModel.deleteOne({ customer_id: customerId });
      } while (result.deletedCount > 0);
    }

    const token = await createToken({ infos: updatedCustomer });

    return res.status(200).json({
      infos: updatedCustomer,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


module.exports = { sendOrders, getOrdersCustomer, deleteOrders };
