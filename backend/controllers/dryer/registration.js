const DryerModel = require("../../models/dryer/DryerModel");
const bcrypt = require("bcrypt");
const createToken = require("../../utils/createToken");

const registerDryer = async (req, res) => {
  const { name, last_name, phone_number, password } = req.body;

  try {
    const isExistAdmin = await DryerModel.findOne({ phone_number });
    if (isExistAdmin) {
      return res.status(400).json({
        message: "خشکشویی با این شماره موبایل وجود دارد",
      });
    }

    if (
      !name ||
      !last_name ||
      !password ||
      !name.trim() ||
      !last_name.trim() ||
      !phone_number ||
      !phone_number.trim()
    ) {
      return res.status(400).json({
        message:
          "نام، نام خانوادگی، شماره موبایل یا رمز عبور وارد نشده یا فقط شامل فضاهای خالی است",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const infos = { name, last_name, phone_number, password: hashedPassword };

    const newDryer = await new DryerModel(infos);
    newDryer.save();

    const token = await createToken({ infos: newDryer });

    return res.status(200).json({
      infos: newDryer,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginDryer = async (req, res) => {
  const { phone_number, password } = req.body;

  try {
    if (!phone_number && !password) {
      return res.status(400).json({
        message: "تمام فیلدهای ورودی را وارد کنید",
      });
    }

    const dryer = await DryerModel.findOne({ phone_number });

    if (!dryer) {
      return res.status(400).json({
        message: "خشکشویی با این شماره موبایل ثبت‌نام نکرده است",
      });
    }

    const comparePassword = await bcrypt.compare(password, dryer.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "رمز عبور شما صحیح نمی‌باشد",
      });
    }
    const token = await createToken({ infos: dryer });

    return res.status(200).json({
      infos: dryer,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const editInformation = async (req, res) => {
  const dryerId = req.headers.authorization;
  const { name, last_name, phone_number } = req.body;

  try {
    if (!name.trim() || !last_name.trim() || !phone_number.trim()) {
      return res.status(400).json({
        message: "مقادیر ورودی خالی هستند",
      });
    }

    const dryer = await DryerModel.findById(dryerId);

    if (!dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی وجود ندارد",
      });
    }

    dryer.name = name;
    dryer.last_name = last_name;
    dryer.phone_number = phone_number;
    await dryer.save();

    const token = await createToken({ infos: dryer });

    return res.status(200).json({
      infos: dryer,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

module.exports = { registerDryer, loginDryer , editInformation };
