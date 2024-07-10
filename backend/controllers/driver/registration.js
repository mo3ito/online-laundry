const DriverModel = require("../../models/driver/DriverModel");
const AdminModel = require("../../models/admin/AdminModel")
const createToken = require("../../utils/createToken");
const bcrypt = require("bcrypt");
const JDate = require("jalali-date");

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
      message: error.message,
    });
  }
};

const driverLogin = async (req, res) => {
  const { phone_number, password } = req.body;

  try {
    if (!phone_number && !password) {
      return res.status(400).json({
        message: "تمام فیلدهای ورودی را وارد کنید",
      });
    }

    const driver = await DriverModel.findOne({ phone_number });

    if (!driver) {
      return res.status(400).json({
        message: "راننده‌ای با این شماره موبایل ثبت‌نام نکرده است",
      });
    }

    const comparePassword = await bcrypt.compare(password, driver.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "رمز عبور شما صحیح نمی‌باشد",
      });
    }

    const token = await createToken({ infos: driver });

    return res.status(200).json({
      infos: driver,
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
  const driverId = req.headers.authorization;
  const { name, last_name, phone_number } = req.body;

  try {
    if (!name.trim() || !last_name.trim() || !phone_number.trim()) {
      return res.status(400).json({
        message: "مقادیر ورودی خالی هستند",
      });
    }

    const driver = await DriverModel.findById(driverId);

    if (!driver) {
      return res.status(400).json({
        message: "راننده‌ای با این آیدی وجود ندارد",
      });
    }

    driver.name = name;
    driver.last_name = last_name;
    driver.phone_number = phone_number;
    await driver.save();

    const token = await createToken({ infos: driver });

    return res.status(200).json({
      infos: driver,
      token,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


const getAllDriver = async (req , res)=>{

  const adminId = req.headers.authorization


  try {
    const admin = await AdminModel.findById(adminId)
    if(!admin){
      return res.status(400).json({
        message: "ادمینی با این آیدی یافت نشد"
      })
    }

    const allDriver = await DriverModel.find({})
    const jdate = new JDate();
    const formatedDate = jdate.date.join("/");

    const drivers = allDriver.map(item=>{
       const jdate = new JDate(item.created_at);
       const formatedDate = jdate.date.join("/");

       return { ...item.toObject(), created_at_shamsi: formatedDate };
    })

    return res.status(200).json(drivers)

  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


module.exports = { driverRegister, driverLogin, editInformation , getAllDriver };
