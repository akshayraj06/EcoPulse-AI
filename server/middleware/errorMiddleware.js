export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const rawMessage = err.message || "Server Error";
  const lowLevelDatabaseError = ["ssl", "tls", "server selection", "buffering timed out"].some((term) =>
    rawMessage.toLowerCase().includes(term),
  );

  res.status(statusCode).json({
    success: false,
    message: lowLevelDatabaseError
      ? "Authentication database is temporarily unavailable. Please try again."
      : rawMessage,
  });
};
