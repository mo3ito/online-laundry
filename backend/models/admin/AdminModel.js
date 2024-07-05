const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
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
  admin_key: {
    type: String,
    require: true,
  },
  is_admin: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Admins = mongoose.model("admins", AdminSchema);

module.exports = Admins;
