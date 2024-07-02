const OrdersModel = require("../../models/orders/Orders");
const DriverModel = require("../../models/driver/DriverModel");
const CustomerModel = require("../../models/customer/CustomerModel");
const GotOrders = require("../../models/orders/GotOrders");

const getAllOrdersIsNotDone = async (req, res) => {
  const driverId = req.headers.authorization;
  try {
    const driver = await DriverModel.findById(driverId);
    if (!driver) {
      return res.status(400).json({
        message: "مامور تحویل و راننده‌ای با این آیدی یافت نشد",
      });
    }

    const allOrders = await OrdersModel.find({});

    const data = allOrders
      .filter((item) => item.is_done_all_order === false && item.orders.every(item=> item.situation === "در انتظار تحویل"))
      .map((item) => item._doc);

    const mergedData = Object.values(
      data.reduce((acc, current) => {
        const key = current.customer_id + current.address;
        if (!acc[key]) {
          acc[key] = { ...current };
        } else {
          acc[key].orders = acc[key].orders.concat(current.orders);
        }
        return acc;
      }, {})
    );

    const updatedData = mergedData.map((customer) => {
      const all_price = customer.orders.reduce(
        (total, order) => total + order.totalCost,
        0
      );
      const all_count = customer.orders.reduce(
        (total, order) => total + order.count,
        0
      );
      return {
        ...customer,
        all_count,
        all_price,
      };
    });

    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAlOrdersIsDone = async (req, res) => {
  const driverId = req.headers.authorization;
  try {
    const driver = await DriverModel.findById(driverId);
    if (!driver) {
      return res.status(400).json({
        message: "مامور تحویل و راننده‌ای با این آیدی یافت نشد",
      });
    }

    const allOrders = await OrdersModel.find({});

    const data = allOrders
      .filter((item) => item.is_done_all_order === true)
      .map((item) => item._doc);

    const mergedData = Object.values(
      data.reduce((acc, current) => {
        const key = current.customer_id + current.address;
        if (!acc[key]) {
          acc[key] = { ...current };
        } else {
          acc[key].orders = acc[key].orders.concat(current.orders);
        }
        return acc;
      }, {})
    );

    const updatedData = mergedData.map((customer) => {
      const all_price = customer.orders.reduce(
        (total, order) => total + order.totalCost,
        0
      );
      const all_count = customer.orders.reduce(
        (total, order) => total + order.count,
        0
      );
      return {
        ...customer,
        all_count,
        all_price,
      };
    });

    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const payOrdersMoney = async (req, res) => {
  const driverId = req.headers.authorization;
  const { customer_id, orders_id } = req.body;

  try {
    const driver = await DriverModel.findById(driverId);
    const customer = await CustomerModel.findById(customer_id)
    if (!driver) {
      return res.status(400).json({
        message: "مامور تحویل و راننده‌ای با این آیدی یافت نشد",
      });
    }

    customer.orders = customer.orders.filter(order => !orders_id.includes(order.orders_id));
    await customer.save();


    console.log("orders_id:", orders_id);

    const allOrders = await OrdersModel.find({ customer_id });

    let targetOrders = [];
    for (const listOrders of allOrders) {
      const filteredOrders = listOrders.orders.filter((order) =>
        orders_id.includes(order.orders_id)
      );

      if (filteredOrders.length > 0) {
        targetOrders.push(...filteredOrders);
      }
    }

    for (const targetOrder of targetOrders) {
      await OrdersModel.updateMany(
        { customer_id },
        { $pull: { orders: { orders_id: targetOrder.orders_id } } }
      );
    }

    const updatedOrders = await OrdersModel.find({ customer_id });
    for (const orderDoc of updatedOrders) {
      if (orderDoc.orders.length === 0) {
        await OrdersModel.deleteOne({ _id: orderDoc._id });
      }
    }

    return res.status(200).json({
      message: "پرداخت با موفقیت صورت گرفت",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "خطایی در سرور رخ داد",
    });
  }
};




const getOrdersFromCustomer = async (req, res) => {
  const driverId = req.headers.authorization;
  const { customer_id, orders_id_list } = req.body;

  try {
    const driver = await DriverModel.findById(driverId);
    const customer = await CustomerModel.findById(customer_id);
    const ordersList = await OrdersModel.find({ customer_id });

    if (!driver) {
      return res.status(400).json({
        message: "مامور تحویل و راننده‌ای با این آیدی یافت نشد",
      });
    }

    if (!customer) {
      return res.status(400).json({
        message: "مشتری‌ای با این آیدی یافت نشد",
      });
    }

    if (ordersList.length === 0) {
      return res.status(404).json({
        message: "هیچ سفارشی برای این مشتری یافت نشد",
      });
    }

    for (const id of orders_id_list) {
      let found = false;
      for (const orderDoc of ordersList) {
        for (const order of orderDoc.orders) {
          if (order.orders_id === id) {
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found) {
        return res.status(400).json({
          message: "آیدی‌های سفارش‌ها درست نیستند"
        });
      }
    }

    for (const orderDoc of ordersList) {
      for (const order of orderDoc.orders) {
        if (orders_id_list.includes(order.orders_id)) {
          order.situation = "تحویل گرفته شده";
        }
      }
      await orderDoc.save();
    }

   return res.status(200).json({
      message: "وضعیت سفارش‌ها با موفقیت به‌روزرسانی شد",
    });

  } catch (error) {
    console.error("Error updating orders: ", error);
    res.status(500).json({
      message: "خطایی در سرور رخ داده است",
    });
  }
};




module.exports = { getAllOrdersIsNotDone, getAlOrdersIsDone, payOrdersMoney , getOrdersFromCustomer };
