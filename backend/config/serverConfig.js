const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");
const connectToDatabase = require("./database")

const configureServer = (app) => {
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(cors);

  connectToDatabase()
};

module.exports = { configureServer };
