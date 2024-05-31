const ClothingCategoryModel = require("../../models/laundry-services/ClothingCategories");
const AdminModel = require("../../models/admin/AdminModel");
const storageMulter = require("../../utils/storageMulter");
require("dotenv").config()
const path = require("path")
const fs = require("fs")

const uploadAndHandleClothingCategoryImage = async (req, res, next) => {
  try {
    const upload = await storageMulter(
      "public/images/clothing-category",
      AdminModel,
      "clothing-category-image"
    );

    upload.single("clothing-category-image")(req, res, (err) => {
      if (err) {
        return next(err);
      }

      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      const filename = req.file.filename;
      res.json({
        message: "عکس با موفقیت آپلود شد",
        filename: filename,
      });
    });
  } catch (error) {
    console.error("خطا:", error);
    next(error);
  }
};

const getClothingCategory = async (req, res) => {
  try {
    const imageDirectory = path.join(__dirname, "../../public/images/clothing-category");
    const imageFiles = fs.readdirSync(imageDirectory);
    const imageFileNames = imageFiles.map(item => path.parse(item).name);

    console.log(imageFileNames);
    const allCategory = await ClothingCategoryModel.find({});
    const updatedCategories = allCategory.map(item => {
      if (imageFileNames.includes(item.name)) {
        const matchingImage = imageFiles.find(image => path.parse(image).name === item.name);
        return { ...item.toObject(), image_url: `${process.env.HOST}:${process.env.PORT}/images/clothing-category/${matchingImage}` };
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

module.exports = {
  getClothingCategory,
  addClothingCategory,
  uploadAndHandleClothingCategoryImage,
};
