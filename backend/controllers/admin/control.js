const DriverModel = require("../../models/driver/DriverModel");
const AdminModel = require("../../models/admin/AdminModel");
const CustomerModel = require("../../models/customer/CustomerModel");
const OrdersModel = require("../../models/orders/Orders");
const PaidOrdersModel = require("../../models/orders/PaidOrders");
const JDate = require("jalali-date");

const verifyDriver = async (req, res) => {
  const adminId = req.headers.authorization;
  const { driver_id } = req.body;

  if (!adminId) {
    return res.status(400).json({
      message: "آیدی ادمین وجود ندارد",
    });
  }

  if (!driver_id) {
    return res.status(400).json({
      message: "آیدی راننده وجود ندارد",
    });
  }

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        message: "ادمینی با این آیدی وجود ندارد",
      });
    }

    const driver = await DriverModel.findById(driver_id);
    if (!driver) {
      return res.status(404).json({
        message: "راننده‌ای با این آیدی وجود ندارد",
      });
    }

    driver.is_register_by_admin = true;
    await driver.save();

    const alldriver = await DriverModel.find({});

    return res.status(200).json(alldriver);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const deleteDriver = async (req, res) => {
  const adminId = req.headers.authorization;
  const { driver_id } = req.body;

  if (!adminId) {
    return res.status(400).json({
      message: "آیدی ادمین وجود ندارد",
    });
  }

  if (!driver_id) {
    return res.status(400).json({
      message: "آیدی راننده وجود ندارد",
    });
  }

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        message: "ادمینی با این آیدی وجود ندارد",
      });
    }

    const driver = await DriverModel.findById(driver_id);
    if (!driver) {
      return res.status(404).json({
        message: "راننده‌ای با این آیدی وجود ندارد",
      });
    }

    await DriverModel.deleteOne({ _id: driver_id });
    const alldriver = await DriverModel.find({});

    return res.status(200).json(alldriver);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const getAlcustomers = async (req, res) => {
  const adminId = req.headers.authorization;

  if (!adminId) {
    return res.status(400).json({
      message: "آیدی ادمین وجود ندارد",
    });
  }
  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        message: "ادمینی با این آیدی وجود ندارد",
      });
    }

    const allCustomer = await CustomerModel.find({});

    const customers = allCustomer.map((item) => {
      const jdate = new JDate(item.created_at);
      const formatedDate = jdate.date.join("/");

      return { ...item.toObject(), created_at_shamsi: formatedDate };
    });

    return res.status(200).json(customers);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const getAllDriver = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const allDriver = await DriverModel.find({});

    const drivers = allDriver.map((item) => {
      const jdate = new JDate(item.created_at);
      const formatedDate = jdate.date.join("/");

      return { ...item.toObject(), created_at_shamsi: formatedDate };
    });

    return res.status(200).json(drivers);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const paidOrders = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const paidOrders = await OrdersModel.find({ is_pay_money: true });

    await PaidOrdersModel.insertMany(paidOrders);

    await OrdersModel.deleteMany({ is_pay_money: true });
    const allPaidOrders = await PaidOrdersModel.find({});

    res.status(200).json(allPaidOrders);
  } catch (error) {
    console.error("خطا در انتقال سفارشات پرداخت شده:", error);
    res.status(500).json({
      message: "خطایی در انتقال سفارشات پرداخت شده رخ داد",
    });
  }
};

const gotOrders = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const orders = await OrdersModel.find({});

    const gotOrders = await orders.filter((item) =>
      item.orders.every((item) => item.situation === "تحویل گرفته شده")
    );

    return res.status(200).json(gotOrders);
  } catch (error) {
    console.error("خطا در انتقال سفارشات پرداخت شده:", error);
    res.status(500).json({
      message: "خطایی در انتقال سفارشات پرداخت شده رخ داد",
    });
  }
};

const deleteOrder = async (req, res) => {
  const adminId = req.headers.authorization;
  const { orderId } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    await OrdersModel.findByIdAndDelete(orderId);

    const orders = await OrdersModel.find({});

    return res.status(200).json(orders);
  } catch (error) {
    console.error("خطا در انتقال سفارشات پرداخت شده:", error);
    res.status(500).json({
      message: "خطایی در انتقال سفارشات پرداخت شده رخ داد",
    });
  }
};
module.exports = {
  getAllDriver,
  verifyDriver,
  deleteDriver,
  getAlcustomers,
  paidOrders,
  gotOrders,
  deleteOrder
};
