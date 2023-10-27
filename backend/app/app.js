const express = require("express");
const cors = require("cors"); // Import the cors middleware
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
require("../config/db");
const app = express();
app.use(cookieParser());
app.use(express.json());
//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3001", // Set the allowed origin
    credentials: true, // Allow cookies and authentication headers
  })
);
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");
const reviewRoute = require("./routes/reviewRoutes");
//global Middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//route Middlewares
app.use("/api/v1/Products/", productRoute);
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/Orders/", orderRoute);
app.use("/api/v1/cart/", cartRoute);
app.use("/api/v1/reviews/", reviewRoute);
app.use(globalErrorHandler);
app.use(express.static("public"));
module.exports = app;
