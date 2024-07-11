const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
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
    default: "در انتظار تحویل"
  },
});

const OrdersSchema = new Schema({
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
    type: [OrderSchema],
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
  is_pay_money:{
    type: Boolean,
    default: false,
  }
});

const Orders = mongoose.model("orders", OrdersSchema);

module.exports = Orders;
