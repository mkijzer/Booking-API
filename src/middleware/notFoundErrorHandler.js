const notFoundErrorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.message.includes("User with id")) {
    return res.status(404).json({ message: err.message });
  }
  res.status(500).json({
    message: "Oops! Something went wrong. Please try again later.",
  });
};

export default notFoundErrorHandler;
