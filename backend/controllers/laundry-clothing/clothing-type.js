const AdminModel = require("../../models/admin/AdminModel");
const ClothingTypesModel = require("../../models/laundry-services/ClothingType");
const uploadImage = require("../../utils/uploadImage");

const addImageClothingType = uploadImage(
  "public/images/clothing-types",
  AdminModel,
  "clothing-types-image"
);

const addClothingTypes = async (req, res) => {
  const {
    clothing_category,
    clothing_category_English,
    type,
    first_price,
    last_price,
    image_url,
    unit,
  } = req.body;

  try {
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
      image_url,
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
