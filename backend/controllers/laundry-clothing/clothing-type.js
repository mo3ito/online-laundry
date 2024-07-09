const AdminModel = require("../../models/admin/AdminModel");
const ClothingTypesModel = require("../../models/laundry-services/ClothingType");
const uploadImage = require("../../utils/uploadImage");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();

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
    english_type,
    services,
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
      !english_type &&
      !services || !Array.isArray(services) || services.length === 0 &&
      !unit
    ) {
      return res.status(400).json({
        message: "لطفا همه‌ی فیلدهای مورد نیاز را پر کنید",
      });
    }

    const isClothingTypeBefore = await ClothingTypesModel.findOne({ type , english_type});

    if (isClothingTypeBefore) {
      return res.status(400).json({
        message: "این تایپ لباس از قبل وجود دارد",
      });
    }

    const newClothingTypesModel = new ClothingTypesModel({
      clothing_category,
      clothing_category_English,
      type,
      english_type,
      services,
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



const getAllTypeByClothingCategory = async (req, res) => {
  const clothingCategory = req.query.clothing_category_English;

  try {
    if (!clothingCategory || !clothingCategory.trim()) {
      return res.status(400).json({
        message: "هیچ کوئری وارد نشده است",
      });
    }

    const imageDirectory = path.join(
      __dirname,
      "../../public/images/clothing-types"
    );
    const imageFiles = await fs.readdir(imageDirectory);
    const imageFileNames = imageFiles.map((item) => path.parse(item).name);

    const allTypes = await ClothingTypesModel.find({
      clothing_category_English: clothingCategory,
    });

    const updatedTypes = allTypes.map((item) => {
      if (imageFileNames.includes(item.english_type)) {
        const matchingImage = imageFiles.find(
          (image) => path.parse(image).name === item.english_type
        );
        return {
          ...item.toObject(),
          image_url: `${process.env.HOST}:${process.env.PORT}/images/clothing-types/${matchingImage}`,
        };
      } else {
        return item.toObject();
      }
    });

    return res.status(200).json(updatedTypes);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


const getOneType = async (req, res) => {
  const englishTypeQuery = req.query.english_type;
  const clothingCategoryEnglishQuery = req.query.clothing_category_English;

  try {
    const targetType = await ClothingTypesModel.findOne({
      english_type: englishTypeQuery,
      clothing_category_English: clothingCategoryEnglishQuery,
    });

    if (!targetType) {
      return res.status(400).json({
        message: "لباسی با این مشخصات یافت نشد",
      });
    }

    return res.status(200).json(targetType);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


module.exports = {
  addClothingTypes,
  addImageClothingType,
  getAllTypeByClothingCategory,
  getOneType,
};
