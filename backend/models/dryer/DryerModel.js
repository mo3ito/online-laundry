const mongoose = require("mongoose");

const { Schema } = mongoose;

const LocationLaundrySchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const DryerSchema = new Schema({
  laundry_name: {
    type: String,
    required: true,
  },
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
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  is_dryer: {
    type: Boolean,
    default: true,
  },
  is_register_by_admin: {
    type: Boolean,
    default: false,
  },
  laundry_address: {
    type: String,
    required: true
  },
  location_laundry: {
    type: LocationLaundrySchema,
    default: {
      type: "Point",
      coordinates: [0, 0],
    },
  },
});

DryerSchema.index({ location_laundry: "2dsphere" });

const Dryer = mongoose.model("dryers", DryerSchema);

module.exports = Dryer;
