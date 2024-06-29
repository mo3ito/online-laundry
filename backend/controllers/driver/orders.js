const OrdersModel = require("../../models/orders/Orders");
const DriverModel = require("../../models/driver/DriverModel");

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
      .filter((item) => item.is_done_all_order === false)
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

module.exports = { getAllOrdersIsNotDone, getAlOrdersIsDone };
