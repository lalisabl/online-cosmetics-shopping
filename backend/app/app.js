const express = require("express");
const cors = require("cors"); // Import the cors middleware
const globalErrorHandler = require("./controllers/errorController");
const db = require("../config/db");
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoutes");
const cartRoute = require("./routes/cartRoutes");
const reviewRoute = require("./routes/reviewRoutes");
const viewRoute = require("./routes/viewRoutes");
const cookieParser = require("cookie-parser");
// const OrderController = require("./controllers/orderController");
const app = express();

// app.post(
//   "/webhook-checkout",
//   bodyParser.raw({ type: "application/json" }),
//   OrderController.webhookCheckout
// );
// body parser
app.use(express.json());
app.use(cookieParser());
//global Middlewares
app.use(
  cors({
    origin: "http://localhost:3001", // Set the allowed origin
    credentials: true, // Allow cookies and authentication headers
  })
);
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
app.use("/api/v1/Overview/", viewRoute);
app.use(globalErrorHandler);
app.use(express.static("public"));
module.exports = app;
