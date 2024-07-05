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

module.exports = { getAllDriver };
