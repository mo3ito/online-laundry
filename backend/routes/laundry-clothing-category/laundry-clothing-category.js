const express = require("express");
const router = express.Router();
const {
  getClothingCategory,
  addClothingCategory,
} = require("../../controllers/laundry-clothing-category/laundry-clothing-category");

router.get("/clothing-category/get-category", getClothingCategory);
router.post("/clothing-category/add-category", addClothingCategory);

module.exports = router;
