function handleErrors(err, req, res, next) {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(403).json({ message: "Invalid token" });
  }
  res.status(500).json({ message: "Internal Server Error" });
}

module.exports = handleErrors;
