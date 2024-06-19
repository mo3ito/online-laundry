const mongoose = require("mongoose");
const { Schema } = mongoose;


 const OrderSchema = new Schema({
  service_type: {
    type : String,
    required: true
  },
  type_clothing: {
    type : String,
    required: true
  },
  count: {
    type : Number,
    required: true
  },
  cost: {
    type : Number,
    required: true
  },
  totalCost: {
    type : Number,
    required: true
  }
})

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
    type: [OrderSchema],
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
