const DriverModel = require("../../models/driver/DriverModel");
const AdminModel = require("../../models/admin/AdminModel");

const getAllDriver = async (req, res) => {
  const adminId = req.headers.authorization;

  try {
    const admin = await AdminModel.findById(adminId);
    const driver = await DriverModel.find({});

    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این آیدی وجود ندارد",
      });
    }

    return res.status(200).json(driver);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

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

  await DriverModel.deleteOne({_id : driver_id})
    const alldriver = await DriverModel.find({});

    return res.status(200).json(alldriver);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


module.exports = { getAllDriver  , verifyDriver , deleteDriver};
