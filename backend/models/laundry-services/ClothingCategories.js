const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClothingCategoriesSchema = new Schema({
  name: {
    type: String,
  },
  english_name: {
    type: String,
  },
  image_url:{
    type: String
  }
});

const ClothingCategory = mongoose.model(
  "clothing-category",
  ClothingCategoriesSchema
);

module.exports = ClothingCategory;
