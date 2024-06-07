const express = require("express");
const router = express.Router();
const {
  addImageClothingType,
  addClothingTypes,
  getAllTypeByClothingCategory,
} = require("../../controllers/laundry-clothing/clothing-type");

router.post("/clothing-type/add-image", addImageClothingType);
router.post("/clothing-type/add-type", addClothingTypes);
router.get("/clothing-type/get-all-type", getAllTypeByClothingCategory);

module.exports = router;
