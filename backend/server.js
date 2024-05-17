const express = require("express");
const { configureServer } = require("./config/serverConfig");
const routes = require("./routes");
const app = express();
require("dotenv").config();
configureServer(app);
app.use("/", routes);
const port = process.env.PORT;

app.listen(port, () => console.log(`Server has run on port ${port}`));
