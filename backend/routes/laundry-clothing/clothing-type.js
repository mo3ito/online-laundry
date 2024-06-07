const express = require("express");
const router = express.Router();
const {
  addImageClothingType,
} = require("../../controllers/laundry-clothing/clothing-type");

router.post("/clothing-type/add-image", addImageClothingType);

module.exports = router;
