class APPError extends Error {
  constructor(statusCode, message) {
    super(message);
    (this.statusCode = statusCode),
      (this.status = this.statusCode.toString().startsWith("4")
        ? "fail"
        : "error");
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = APPError;
