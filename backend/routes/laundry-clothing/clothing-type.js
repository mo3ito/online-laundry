const express = require("express");
const router = express.Router();
const {
  addImageClothingType, addClothingTypes
} = require("../../controllers/laundry-clothing/clothing-type");

router.post("/clothing-type/add-image", addImageClothingType);
router.post("/clothing-type/add-type",addClothingTypes)

module.exports = router;
