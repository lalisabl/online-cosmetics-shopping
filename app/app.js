const express = require("express");
const dbConn = require("../config/db");
const app = express();
app.use(express.json());
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");
app.use("/api/v1/Products/", productRoute);
// Import your database configuration
module.exports = app;
