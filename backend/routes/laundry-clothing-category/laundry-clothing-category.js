const express = require("express");
const router = express.Router();
const {
  getClothingCategory,
  addClothingCategory,
} = require("../../controllers/laundry-clothing-category/laundry-clothing-category");

router.get("/get-clothing-category", getClothingCategory);
router.post("/add-clothing-category", addClothingCategory);

module.exports = router;
