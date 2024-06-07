const AdminModel = require("../../models/admin/AdminModel");
const ClothingTypesModel = require("../../models/laundry-services/ClothingType");
const uploadImage = require("../../utils/uploadImage");
const path = require("path");

const addImageClothingType = uploadImage(
  "public/images/clothing-types",
  AdminModel,
  "clothing-types-image"
);

const addClothingTypes = async (req, res) => {
  const adminId = req.headers.authorization;
  const {
    clothing_category,
    clothing_category_English,
    type,
    first_price,
    last_price,
    unit,
  } = req.body;

  console.log("Admin ID:", adminId);
  try {
    const isAdmin = await AdminModel.findById(adminId);

    if (!isAdmin) {
      return res.status(400).json({
        message: "ادمین آیدی وارد شده صحیح نمی‌باشد",
      });
    }

    if (
      !clothing_category &&
      !clothing_category_English &&
      !type &&
      !first_price &&
      !last_price &&
      !unit
    ) {
      return res.status(400).json({
        message: "لطفا همه‌ی فیلدهای مورد نیاز را پر کنید",
      });
    }

    const newClothingTypesModel = new ClothingTypesModel({
      clothing_category,
      clothing_category_English,
      type,
      first_price,
      last_price,
      unit,
    });

    await newClothingTypesModel.save();

    return res.status(200).json({
      message: "نوع لباس با موفقیت اضافه شد",
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

module.exports = { addClothingTypes, addImageClothingType };
