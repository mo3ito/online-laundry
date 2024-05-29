const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");
const connectToDatabase = require("./database");
const adminRegistration = require("../routes/admin/registration");
const customerRegistration = require("../routes/customers/registration");
const startServer = require("../routes/index");
const ClothingCategory = require("../routes/laundry-clothing-category/laundry-clothing-category");

const configureServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  app.use("/", startServer);
  app.use("/", adminRegistration);
  app.use("/", customerRegistration);
  app.use("/", ClothingCategory);
  connectToDatabase();
};

module.exports = configureServer;
