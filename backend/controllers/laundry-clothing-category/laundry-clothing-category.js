const ClothingCategoryModel = require("../../models/laundry-services/ClothingCategories");
const AdminModel = require("../../models/admin/AdminModel");

const getClothingCategory = async (req, res) => {
  try {
    const allCategory = await ClothingCategoryModel.find({});

    return await res.status(200).json(allCategory);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const addClothingCategory = async (req, res) => {
  const adminId = req.headers.authorization;
  const { name } = req.body;

  try {
    if (!adminId) {
      return res.status(400).json({
        message: "شما ادمین آیدی را وارد نکرده‌اید",
      });
    }

    const isAdmin = await AdminModel.findById(adminId);

    if (!isAdmin) {
      return res.status(400).json({
        message: " ادمین آیدی صحیح نیست",
      });
    }

    if (!name) {
      return res.status(400)({
        message: "شما نام دسته بندی لباس را وارد نکردید",
      });
    }

    const isExistName = await ClothingCategoryModel.findOne({ name });

    if (isExistName) {
      return res.status(400).json({
        message: "این نام دسته‌بندی از قبل وجود دارد",
      });
    }

    const newClothingCategory = await new ClothingCategoryModel({ name });
    await newClothingCategory.save();

    return res.status(200).json({
      message: "نام دسته بندی با موفقیت اضافه شد",
      name,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const deleteClothingCategory = (req, res) => {};

module.exports = { getClothingCategory, addClothingCategory };
