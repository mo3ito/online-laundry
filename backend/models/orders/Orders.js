const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdersSchema = new Schema({
  customer_id:{
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  orders: {
    type: [],
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;
