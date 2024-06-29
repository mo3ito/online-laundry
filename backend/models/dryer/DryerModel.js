const mongoose = require("mongoose");
const { Schema } = mongoose;

const DryerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  is_dryer: {
    type: String,
    default: true,
  },
});

const Dryer = mongoose.model("dryers", DryerSchema);

module.exports = Dryer;
