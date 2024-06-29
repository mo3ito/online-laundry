const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");
const connectToDatabase = require("./database");
const Admin = require("../routes/admin");
const Customers = require("../routes/customers");
const StartServer = require("../routes/index");
const LaundryClothing = require("../routes/laundry-clothing");
const Orders = require("../routes/orders");
const Driver = require("../routes/driver");
const Dryer = require("../routes/dryer");

const configureServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  app.use(express.static(path.join(__dirname, "../public")));
  app.use("/", StartServer);
  app.use("/", Admin);
  app.use("/", Customers);
  app.use("/", LaundryClothing);
  app.use("/", Orders);
  app.use("/", Driver);
  app.use("/", Dryer);
  connectToDatabase();
};

module.exports = configureServer;
