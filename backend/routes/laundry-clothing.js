const express = require("express");
const router = express.Router();
const {
  addImageClothingType,
  addClothingTypes,
  getAllTypeByClothingCategory,
  getOneType,
  deleteTypeClothing,
} = require("../controllers/laundry-clothing/clothing-type");
const {
  getClothingCategory,
  addClothingCategory,
  uploadAndHandleClothingCategoryImage,
  deleteClothingCategory,
} = require("../controllers/laundry-clothing/laundry-clothing-category");

router.post("/clothing-type/add-image", addImageClothingType);
router.post("/clothing-type/add-type", addClothingTypes);
router.delete("/clothing-type/delete-type-clothing", deleteTypeClothing);
router.get("/clothing-type/get-all-type", getAllTypeByClothingCategory);
router.get("/clothing-type/get-one-type", getOneType);
router.get("/clothing-category/get-category", getClothingCategory);
router.post("/clothing-category/add-category", addClothingCategory);
router.post(
  "/clothing-category/upload-image",
  uploadAndHandleClothingCategoryImage
);
router.delete("/clothing-category/delete-category", deleteClothingCategory);

module.exports = router;
