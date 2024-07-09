const fs = require("fs")
const path = require("path");
const ClothingCategoryModel = require("../../models/laundry-services/ClothingCategories");
const AdminModel = require("../../models/admin/AdminModel");
const deleteFiles = require("../../utils/deleteFiles");
const uploadImage = require("../../utils/uploadImage");
require("dotenv").config();

const uploadAndHandleClothingCategoryImage = uploadImage(
  "public/images/clothing-category",
  AdminModel,
  "clothing-category-image"
);



const getClothingCategory = async (req, res) => {
  try {
    const imageDirectory = path.join(
      __dirname,
      "../../public/images/clothing-category"
    );
    const imageFiles = fs.readdirSync(imageDirectory);
    const imageFileNames = imageFiles.map((item) => path.parse(item).name);

    console.log(imageFileNames);
    const allCategories = await ClothingCategoryModel.find({});
    const updatedCategories = allCategories.map((item) => {
      if (imageFileNames.includes(item.english_name)) {
        const matchingImage = imageFiles.find(
          (image) => path.parse(image).name === item.english_name
        );
        return {
          ...item.toObject(),
          image_url: `${process.env.HOST}:${process.env.PORT}/images/clothing-category/${matchingImage}`,
        };
      } else {
        return item.toObject();
      }
    });

    return res.status(200).json(updatedCategories);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


const addClothingCategory = async (req, res) => {
  const adminId = req.headers.authorization;
  const { name, english_name } = req.body;

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
      return res.status(400).json({
        message: "شما نام دسته بندی لباس را وارد نکردید",
      });
    }

    if (!english_name) {
      return res.status(400).json({
        message: "شما نام دسته بندی لباس را به انگلیسی وارد نکردید",
      });
    }

    const isExistName = await ClothingCategoryModel.findOne({
      name,
      english_name,
    });

    if (isExistName) {
      return res.status(400).json({
        message: "این نام دسته‌بندی از قبل وجود دارد",
      });
    }

    const newClothingCategory = await new ClothingCategoryModel({
      name,
      english_name,
    });
    await newClothingCategory.save();

    return res.status(200).json({
      message: "نام دسته بندی با موفقیت اضافه شد",
      data: {
        name,
        english_name,
      },
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

const deleteClothingCategory = async (req, res) => {
  const adminId = req.headers.authorization;
  const { clothing_category_id, clothing_category_english_name } = req.body;

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

    if (!clothing_category_id) {
      return res.status(400).json({
        message: "شما آیدی دسته‌بندی را وارد نکردید",
      });
    }

    if (!clothing_category_english_name) {
      return res.status(400).json({
        message: "شما نام دسته‌بندی را وارد نکردید",
      });
    }

    await ClothingCategoryModel.findByIdAndDelete(clothing_category_id);

    const directoryPath = path.join(
      __dirname,
      "../../public/images/clothing-category"
    );

    await deleteFiles(directoryPath, clothing_category_english_name);

    const newClothingCategories = await ClothingCategoryModel.find({});
    res.status(200).json(newClothingCategories);
  } catch (error) {
    console.error("error:", error.message);
    res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};

module.exports = {
  getClothingCategory,
  addClothingCategory,
  uploadAndHandleClothingCategoryImage,
  deleteClothingCategory,
};
