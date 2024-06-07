const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClothingTypesSchema = new Schema({
  clothing_category: {
    type: String,
    required: true,
  },
  clothing_category_English: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  first_price: {
    type: String,
    required: true,
  },
  last_price: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  unit: {
    type: String,
    required: true,
  },
});

const ClothingTypes = mongoose.model("clothing-types", ClothingTypesSchema);

module.exports = ClothingTypes;
