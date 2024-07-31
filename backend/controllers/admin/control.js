const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");
const getAllImages = require("../../utils/getAllImages");
const DriverModel = require("../../models/driver/DriverModel");
const AdminModel = require("../../models/admin/AdminModel");
const CustomerModel = require("../../models/customer/CustomerModel");
const OrdersModel = require("../../models/orders/Orders");
const PaidOrdersCustomerModel = require("../../models/orders/PaidOrdersCustomer");
const DryerModel = require("../../models/dryer/DryerModel");
const PaidDryersModel = require("../../models/orders/PaidDryers");

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

const getAllOrders = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const allOrders = await OrdersModel.find({});

    return res.status(200).json(allOrders);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const PaidOrdersCustomer = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const PaidOrdersCustomer = await OrdersModel.find({ is_pay_money: true });

    await PaidOrdersCustomerModel.insertMany(PaidOrdersCustomer);

    await OrdersModel.deleteMany({ is_pay_money: true });
    const allPaidOrdersCustomer = await PaidOrdersCustomerModel.find({});

    res.status(200).json(allPaidOrdersCustomer);
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

const deletePaidOrder = async (req, res) => {
  const adminId = req.headers.authorization;
  const { orderId } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    await PaidOrdersCustomerModel.findByIdAndDelete(orderId);

    const orders = await PaidOrdersCustomerModel.find({});

    return res.status(200).json(orders);
  } catch (error) {
    console.error("خطا در انتقال سفارشات پرداخت شده:", error);
    res.status(500).json({
      message: "خطایی در انتقال سفارشات پرداخت شده رخ داد",
    });
  }
};

const getAllCategoryImages = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    try {
      const images = await getAllImages(
        path.resolve("public/images"),
        "/clothing-category"
      );
      res.status(200).json({ images: images });
    } catch (err) {
      console.error("Error in getAllImages:", err);
      res.status(500).json({
        message: "خطا در خواندن دایرکتوری",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const getAllTypeImages = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    try {
      const images = await getAllImages(
        path.resolve(`public/images/`),
        "clothing-types"
      );
      res.status(200).json({ images: images });
    } catch (err) {
      console.error("Error in getAllImages:", err);
      res.status(500).json({
        message: "خطا در خواندن دایرکتوری",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const deleteCategoryImage = async (req, res) => {
  const adminId = req.headers.authorization;
  const { image_name } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const imagePath = path.join(
      path.resolve("public/images"),
      "/clothing-category",
      image_name
    );

    await fs.unlink(imagePath);

    const images = await getAllImages(
      path.resolve("public/images"),
      "/clothing-category"
    );
    res.status(200).json({ images: images });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const deleteTypeImage = async (req, res) => {
  const adminId = req.headers.authorization;
  const { image_name } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const imagePath = path.join(
      path.resolve("public/images"),
      "clothing-types",
      image_name
    );

    try {
      await fs.access(imagePath);
    } catch (error) {
      return res.status(400).json({
        message: "تصویری با این نام یافت نشد",
      });
    }

    await fs.unlink(imagePath);

    const images = await getAllImages(
      path.resolve("public/images"),
      "/clothing-types"
    );
    res.status(200).json({ images: images });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const deleteCustomer = async (req, res) => {
  const adminId = req.headers.authorization;
  const { customer_id } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    await CustomerModel.findByIdAndDelete(customer_id);

    const allCustomer = await CustomerModel.find({});

    return res.status(200).json(allCustomer);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const unverifiedDryerByAdmin = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const allAwatingRegisterByAdmin = await DryerModel.find({
      is_register_by_admin: false,
    });

    const allUnverifiedDryrs = await allAwatingRegisterByAdmin.map((item) => {
      const jdate = new JDate(item.created_at);
      const formatedDate = jdate.date.join("/");

      return { ...item.toObject(), created_at_shamsi: formatedDate };
    });

    return res.status(200).json(allUnverifiedDryrs);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const confirmVerifiedDryerByAdmin = async (req, res) => {
  const adminId = req.headers.authorization;
  const { dryer_id } = req.body;
  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const dryer = await DryerModel.findById(dryer_id);
    dryer.is_register_by_admin = true;

    await dryer.save();

    const allUnverifiedDryer = await DryerModel.find({
      is_register_by_admin: false,
    });

    return res.status(200).json(allUnverifiedDryer);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const deleteUnverifiedDryer = async (req, res) => {
  const adminId = req.headers.authorization;
  const { dryer_id } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    await DryerModel.deleteOne({ _id: dryer_id });

    const allUnverifiedDryer = await DryerModel.find({
      is_register_by_admin: false,
    });

    return res.status(200).json(allUnverifiedDryer);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const getAllVerifyDryers = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }
    const allVerifiedDryer = await DryerModel.find({
      is_register_by_admin: true,
    });

    const allVerifiedDryers = await allVerifiedDryer.map((item) => {
      const jdate = new JDate(item.created_at);
      const formatedDate = jdate.date.join("/");

      return { ...item.toObject(), created_at_shamsi: formatedDate };
    });

    return res.status(200).json(allVerifiedDryers);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const deleteDryer = async (req, res) => {
  const adminId = req.headers.authorization;
  const { dryer_id } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    await DryerModel.deleteOne({ _id: dryer_id });

    const allVerifiedDryer = await DryerModel.find({
      is_register_by_admin: true,
    });

    return res.status(200).json(allVerifiedDryer);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const enterCoordinatesDryer = async (req, res) => {
  const adminId = req.headers.authorization;
  const { dryer_id, longitude, latitude } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    const dryer = await DryerModel.findById(dryer_id);
    dryer.location_laundry.coordinates[0] = longitude;
    dryer.location_laundry.coordinates[1] = latitude;
    await dryer.save();

    return res.status(200).json({
      message: "مختصات با موفقیت ثبت شد",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const unpaidDryerOrders = async (req, res) => {
  const adminId = req.headers.authorization;
  const { dryer_id } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    const dryer = await DryerModel.findById(dryer_id);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    if (!dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی یافت نشد",
      });
    }

    const ordersDryerDone = await PaidOrdersCustomerModel.find({
      "service_laundry.laundry_id": dryer_id,
    });

    return res.status(200).json(ordersDryerDone);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const payDryerOrders = async (req, res) => {
  const adminId = req.headers.authorization;
  const { orders_id_array, dryer_id } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }
    const ObjectId = mongoose.Types.ObjectId;

    const objectIdArray = orders_id_array.map((id) => {
      if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
      return ObjectId.createFromHexString(id);
    });

    await PaidOrdersCustomerModel.updateMany(
      { _id: { $in: objectIdArray }, "service_laundry.laundry_id": dryer_id },
      { $set: { is_debt_settlement_laundry: true } }
    );

    const updatedOrders = await PaidOrdersCustomerModel.find({
      is_debt_settlement_laundry: true,
    });

    if (updatedOrders.length > 0) {
      await PaidDryersModel.insertMany(updatedOrders);
    }

    await PaidOrdersCustomerModel.deleteMany({
      is_debt_settlement_laundry: true,
    });

    const unpaidOrdersDryer = await PaidOrdersCustomerModel.find({
      is_debt_settlement_laundry: false,
    });

    return res.status(200).json(unpaidOrdersDryer);
  } catch (error) {
    console.error("Error processing orders:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

const getMoneyPaidDryerOrders = async (req, res) => {
  const adminId = req.headers.authorization;
  const { dryer_id } = req.body;

  try {
    const admin = await AdminModel.findById(adminId);
    const dryer = await DryerModel.findById(dryer_id);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    if (!dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی یافت نشد",
      });
    }

    const moneyPaidOrders = await PaidDryersModel.find({
      "service_laundry.laundry_id": dryer_id,
    });

    return res.status(200).json(moneyPaidOrders);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};



const deleteMoneyUnpaidToDryersOrders = async (req, res) => {
  const adminId = req.headers.authorization;
  const { orders_id_array, dryer_id } = req.body;
  try {
    const admin = await AdminModel.findById(adminId);
    const dryer = await DryerModel.findById(dryer_id);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    if (!dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی یافت نشد",
      });
    }

    const ObjectId = mongoose.Types.ObjectId;

    const objectIdArray = orders_id_array.map((id) => {
      if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
      return ObjectId.createFromHexString(id);
    });

    await PaidOrdersCustomerModel.deleteMany({
      _id: { $in: objectIdArray },
      "service_laundry.laundry_id": dryer_id,
    });

    const allOrders = await PaidOrdersCustomerModel.find({is_debt_settlement_laundry : false});

    return res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};


const deleteMoneyPaidToDryersOrders = async (req, res) => {
  const adminId = req.headers.authorization;
  const { orders_id_array, dryer_id } = req.body;
  try {
    const admin = await AdminModel.findById(adminId);
    const dryer = await DryerModel.findById(dryer_id);
    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد",
      });
    }

    if (!dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی یافت نشد",
      });
    }

    const ObjectId = mongoose.Types.ObjectId;

    const objectIdArray = orders_id_array.map((id) => {
      if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
      return ObjectId.createFromHexString(id);
    });

    await PaidDryersModel.deleteMany({
      _id: { $in: objectIdArray },
      "service_laundry.laundry_id": dryer_id,
    });

    const allOrders = await PaidDryersModel.find({is_debt_settlement_laundry : false});

    return res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "خطای سرور",
    });
  }
};

module.exports = {
  getAllDriver,
  verifyDriver,
  deleteDriver,
  getAlcustomers,
  PaidOrdersCustomer,
  gotOrders,
  deleteOrder,
  deletePaidOrder,
  getAllOrders,
  getAllCategoryImages,
  getAllTypeImages,
  deleteCategoryImage,
  deleteTypeImage,
  deleteCustomer,
  unverifiedDryerByAdmin,
  confirmVerifiedDryerByAdmin,
  deleteUnverifiedDryer,
  getAllVerifyDryers,
  deleteDryer,
  enterCoordinatesDryer,
  unpaidDryerOrders,
  payDryerOrders,
  getMoneyPaidDryerOrders,
  deleteMoneyUnpaidToDryersOrders,
  deleteMoneyPaidToDryersOrders
};
