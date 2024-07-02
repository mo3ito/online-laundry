const mongoose = require("mongoose");
const { Schema } = mongoose;

const GotOrderSchema = new Schema({
  service_type: {
    type: String,
    required: true,
  },
  type_clothing: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  created_at: {
    type: String,
    default: "",
  },
  orders_id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  situation:{
    type: String,
    required: true
  },
  is_done_order: {
    type: Boolean,
    default: false,
  },
});

const GotOrdersSchema = new Schema({
  customer_id: {
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
    type: [GotOrderSchema],
    required: true,
  },
  phone_number: {
    type: String,
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
  is_done_all_order: {
    type: Boolean,
    default: false,
  },
});

const GotOrders = mongoose.model("got-orders", GotOrdersSchema);

module.exports = GotOrders;
