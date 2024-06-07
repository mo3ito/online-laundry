const express = require("express");
const router = express.Router();
const {
  getClothingCategory,
  addClothingCategory,
  uploadAndHandleClothingCategoryImage
} = require("../../controllers/laundry-clothing/laundry-clothing-category");

router.get("/clothing-category/get-category", getClothingCategory);
router.post("/clothing-category/add-category", addClothingCategory);
router.post("/clothing-category/upload-image", uploadAndHandleClothingCategoryImage);

module.exports = router;