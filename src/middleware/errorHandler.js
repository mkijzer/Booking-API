const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Ooh bummer! Something went wrong!" });
};

export default errorHandler;
