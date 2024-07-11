const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrdersSchema = new Schema({
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

});

const PaidOrdersSchema = new Schema({
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
    type: [OrdersSchema],
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

const PaidOrders = mongoose.model("paid-orders", PaidOrdersSchema);

module.exports = PaidOrders;
