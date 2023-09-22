const express = require("express");
const dbConn = require("../config/db");

const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(express.json());
app.use(cors());
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
app.use("/api/v1/Products/", productRoute);
app.use("/api/v1/user/", userRoute);
// Import your database configuration
module.exports = app;
