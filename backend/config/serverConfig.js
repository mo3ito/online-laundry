const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");
const connectToDatabase = require("./database");
const customerRegistration = require("../routes/customers/registration")
const startServer = require("../routes/index")

const configureServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);
  app.use("/", startServer);
  app.use("/",customerRegistration)
  connectToDatabase();
  
};

module.exports = configureServer
