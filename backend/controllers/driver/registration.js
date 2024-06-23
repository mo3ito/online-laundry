const DriverModel = require("../../models/driver/DriverModel");
const createToken = require("../../utils/createToken");

const driverRegister = async (req, res) => {
  const { name, last_name, phone_number } = req.body;

  try {
    if (!name || !last_name || !phone_number) {
      return res.status(400).json({
        message: "تمامی فیلدهای ورودی را پر کنید",
      });
    }

    const infosDriver = { name, last_name, phone_number };

    const isRegisterDriverBefore = await DriverModel.findOne({ phone_number });

    if (isRegisterDriverBefore) {
      return res.status(400).json({
        message: "راننده با این شماره قبلا ثبت‌نام کرده است",
      });
    }

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
