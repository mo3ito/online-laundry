const OrdersModel = require("../../models/orders/Orders");
const DriverModel = require("../../models/driver/DriverModel");

const getAllOrders = async (req, res) => {
  const driverId = req.headers.authorization;
  try {
    const driver = await DriverModel.findById(driverId);
    if (!driver) {
      return res.status(400).json({
        message: "مامور تحویل و راننده‌ای با این آیدی یافت نشد",
      });
    }

    const allOrders = await OrdersModel.find({});

    return res.status(200).json(allOrders);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {getAllOrders};
