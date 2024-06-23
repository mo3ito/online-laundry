const DriverModel = require("../../models/driver/DriverModel");
const createToken = require("../../utils/createToken");
const bcrypt = require("bcrypt");

const driverRegister = async (req, res) => {
  const { name, last_name, phone_number, password } = req.body;

  try {
    if (!name || !last_name || !phone_number || !password) {
      return res.status(400).json({
        message: "تمامی فیلدهای ورودی را پر کنید",
      });
    }

    const isRegisterDriverBefore = await DriverModel.findOne({ phone_number });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (isRegisterDriverBefore) {
      return res.status(400).json({
        message: "راننده با این شماره قبلا ثبت‌نام کرده است",
      });
    }

    const infosDriver = {
      name,
      last_name,
      phone_number,
      password: hashedPassword,
    };

    const newDriver = await new DriverModel(infosDriver);

    await newDriver.save();

    const token = await createToken({ infos: newDriver });

    return res.status(200).json({
      infos: newDriver,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error,
    });
  }
};
module.exports = { driverRegister };
