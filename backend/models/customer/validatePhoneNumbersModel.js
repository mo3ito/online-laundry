const mongoose = require("mongoose");
const { Schema } = mongoose;

const ValidatePhoneNumberSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
  },
  is_register: {
    type: Boolean,
    default: false,
  },
  codeNumber: {
    type: String,
    required: true,
  },
});

const ValidatePhonenumberCustomers = mongoose.model(
  "validate-phone-numbers",
  ValidatePhoneNumberSchema
);

module.exports = ValidatePhonenumberCustomers;
