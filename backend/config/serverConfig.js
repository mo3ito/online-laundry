const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");
const connectToDatabase = require("./database");
const adminRegistration = require("../routes/admin/registration");
const customerRegistration = require("../routes/customers/registration");
const startServer = require("../routes/index");
const ClothingCategory = require("../routes/laundry-clothing/laundry-clothing-category");
const ClothingTypes = require("../routes/laundry-clothing/clothing-type");
const Orders = require("../routes/orders/orders");
const Driver = require("../routes/driver/registration");
const Dryer = require("../routes/dryer/registeration");

const configureServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  app.use(express.static(path.join(__dirname, "../public")));
  app.use("/", startServer);
  app.use("/", adminRegistration);
  app.use("/", customerRegistration);
  app.use("/", ClothingCategory);
  app.use("/", ClothingTypes);
  app.use("/", Orders);
  app.use("/", Driver);
  app.use("/", Dryer);
  connectToDatabase();
};

module.exports = configureServer;
