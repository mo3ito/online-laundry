const express = require("express");
const bodyParser = require("body-parser");
const cors = require("../middlewares/corsConfig");

const configureServer = (app) => {
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cors);
};

module.exports = { configureServer };