const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomersAwaitingValidationSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
  },
  is_register: {
    type: Boolean,
    default: false,
  },
  code_number: {
    type: String,
    required: false,
  },
});

const CustomersAwaitingValidation = mongoose.model(
  "customer-awaiting-validation",
  CustomersAwaitingValidationSchema
);

module.exports = CustomersAwaitingValidation;
