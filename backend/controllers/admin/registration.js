const bcrypt = require("bcrypt");
require("dotenv").config();
const AdminModel = require("../../models/admin/AdminModel");
const DriverModel = require("../../models/driver/DriverModel");
const createToken = require("../../utils/createToken");

const adminRegister = async (req, res) => {
  const { name, last_name, username, password, admin_key, phone_number } =
    req.body;

  try {
    const passwordKey = process.env.ADMIN_KEY;
    const compareadmin_key = await bcrypt.compare(admin_key, passwordKey);
    const isExistAdmin = await AdminModel.findOne({ username, phone_number });

    if (admin_key && !compareadmin_key) {
      return res.status(400).json({
        message: "کلید ادمین وارد شده نادرست است",
      });
    }

    if (isExistAdmin) {
      return res.status(400).json({
        message: "ادمینی با چنین نام کاربری یا موبایلی وجود دارد",
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
      !last_name.trim() ||
      !phone_number ||
      !phone_number.trim()
    ) {
      return res.status(400).json({
        message:
          "نام، نام خانوادگی، کلید ادمین، نام کاربری شماره موبایل یا رمز عبور وارد نشده یا فقط شامل فضاهای خالی است",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminInformation = {
      name,
      last_name,
      username,
      password: hashedPassword,
      phone_number,
      admin_key: process.env.ADMIN_KEY,
    };

    const newAdmin = await new AdminModel(adminInformation);
    await newAdmin.save();

    const adminInfos = {
      _id: newAdmin._id,
      name: newAdmin.name,
      last_name: newAdmin.last_name,
      username: newAdmin.username,
      phone_number: newAdmin.phone_number,
      is_admin: newAdmin.is_admin,
      created_at: newAdmin.created_at,
    };

    const token = await createToken(adminInfos);

    return res.status(200).json({
      infos: adminInfos,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const adminLogin = async (req, res) => {
  const { phone_number, username, admin_key, password } = req.body;

  try {
    if ((!phone_number && !password && !username, !admin_key)) {
      return res.status(400).json({
        message: "تمام فیلدهای ورودی را وارد کنید",
      });
    }

    const admin = await AdminModel.findOne({ phone_number, username });

    if (!admin) {
      return res.status(400).json({
        message: "ادمینی با این شماره موبایل یا نام کاربری ثبت‌نام نکرده است",
      });
    }
    const compareAdminKey = await bcrypt.compare(admin_key, admin.admin_key);
    if (!compareAdminKey) {
      return res.status(400).json({
        message: " کلید ادمین شما صحیح نمی‌باشد",
      });
    }
    const comparePassword = await bcrypt.compare(password, admin.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "رمز عبور شما صحیح نمی‌باشد",
      });
    }

    const adminInfos = {
      _id: admin._id,
      name: admin.name,
      last_name: admin.last_name,
      username: admin.username,
      phone_number: admin.phone_number,
      is_admin: admin.is_admin,
      created_at: admin.created_at,
    };

    const token = await createToken({ infos: adminInfos });

    return res.status(200).json({
      infos: adminInfos,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { adminRegister, adminLogin };
