const express = require("express");
const configureServer  = require("./config/serverConfig");
const app = express();
require("dotenv").config();
configureServer(app);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server has run on port ${port}`));
