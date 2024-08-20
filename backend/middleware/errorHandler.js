const errorHandler = (err, req, res, next) => {
  console.error(err);

  const isProduction = process.env.IS_PRODUCTION;
  const response = {
    success: false,
    message: err.message || "An unexpected error occurred",
  };

  if (!isProduction) {
    response.error = err;
  }
  const statusCode = err.status || 500;

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
