const mongoose = require("mongoose");
const { Schema } = mongoose;

const DriverSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  phone_number: {
    type: String,
    require: true,
  },
  is_driver: {
    type: Boolean,
    default: true,
  },
  is_register_by_admin: {
    type: Boolean,
    default: false,
  },
});

const Driver = mongoose.model("driver", DriverSchema);

module.exports = Driver;
