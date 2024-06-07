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
  connectToDatabase();
};

module.exports = configureServer;
