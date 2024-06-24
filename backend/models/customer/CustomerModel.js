const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomersSchema = new Schema({
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
  orders: {
    type: [],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  is_customer:{
    type: String,
    default: true
  }
});

const Customers = mongoose.model("customers", CustomersSchema);

module.exports = Customers;
