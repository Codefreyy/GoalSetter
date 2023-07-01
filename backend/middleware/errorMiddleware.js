const errorHandler = (err, req, res, next) => {
  // not 400 or 200, then 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  // The stack property is set to null when the Node environment is set to production, which is a common practice to prevent sensitive information from being leaked to clients. When process.env.NODE_ENV is not set to "production", err.stack is included in the response.
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
