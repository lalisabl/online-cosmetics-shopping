const APPError = require("../../utils/errorHandling");
let message = null;
handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new APPError(400, message);
};
handleDuplicateFieldError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  message = `Duplicate key error. The value '${err.keyValue[field]}' for field '${field}' is already in use.`;
  return new APPError(400, message);
};
handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  message = `Invalid input data: ${errors.join(".")}`;
  return new APPError(400, message);
};

const sendResponse = (err, res) => {
  res.status(400).json({ status: err.status, message: err.message });
};
module.exports = (err, req, res, next) => {
  let error = { ...err };
  if (error.kind === "ObjectId") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldError(error);
  if (error._message === "Product validation failed")
    error = handleValidationErrorDB(error);
  sendResponse(error, res);
};
