const express = require("express");
const cors = require("cors"); // Import the cors middleware
const globalErrorHandler = require("./controllers/errorController");
require("../config/db");
const app = express();
app.use(express.json());
app.use(cors());
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");
app.use("/api/v1/Products/", productRoute);
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/Orders/", orderRoute);
app.use("/api/v1/cart/", cartRoute);
app.use(globalErrorHandler);
module.exports = app;
