const mongoose = require("mongoose");
const { Schema } = mongoose;

const servicesSchema = new Schema({
  name_service: String,
  price: String,
});

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
  services: {
    type: [servicesSchema],
    required: true,
  },
  english_type: {
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
