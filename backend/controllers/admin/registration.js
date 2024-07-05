const bcrypt = require("bcrypt");
require("dotenv").config();
const AdminModel = require("../../models/admin/AdminModel");
const DriverModel = require("../../models/driver/DriverModel")
const createToken = require("../../utils/createToken");

const adminRegister = async (req, res) => {
  const { name, last_name, username, password, admin_key } = req.body;

  try {
    const passwordKey = process.env.ADMIN_KEY;
    const compareadmin_key = await bcrypt.compare(admin_key, passwordKey);
    const isExistAdmin = await AdminModel.findOne({ username });

    if (admin_key && !compareadmin_key) {
      return res.status(400).json({
        message: "کلید ادمین وارد شده نادرست است",
      });
    }

    if (isExistAdmin) {
      return res.status(400).json({
        message: "ادمینی با چنین نام کاربری وجود دارد",
      });
    }

    if (
      !admin_key ||
      !username ||
      !name ||
      !last_name ||
      !password ||
      !username.trim() ||
      !name.trim() ||
      !last_name.trim()
    ) {
      return res.status(400).json({
        message:
          "نام، نام خانوادگی، کلید ادمین، نام کاربری یا رمز عبور وارد نشده یا فقط شامل فضاهای خالی است",
      });
    }

    const adminInformation = { name, last_name, username, password, admin_key };

    const newAdmin = await new AdminModel(adminInformation);
    await newAdmin.save();
    const adminInfos = { id: newAdmin._id, name, last_name, username };
    const token = await createToken(adminInfos);

    return res.status(200).json({
      adminInfos,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};



module.exports = { adminRegister };
