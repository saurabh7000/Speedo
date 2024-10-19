import ErrorHandler from "../utils/errorHandler.js";

export default (error, req, res, next) => {
  error.message = error.message || "Internal server error";
  error.statusCode = error.statusCode || 400;

  if (error.name == "CastError") {
    const message = `Resource not found, ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Mongo server duplicate key error
  if (error.code === 11000 || error.name === "MongoServerError") {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
