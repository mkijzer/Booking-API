const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ message: "Your destination is not found" });
};

export default notFoundErrorHandler;
