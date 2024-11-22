const errorHandler = (err, req, res, next) => {
  console.error("Error in BookingAPI:", {
    name: err.name,
    message: err.message,
    code: err.code,
  });

  if (err.message.includes("not found")) {
    return res
      .status(404)
      .json({ message: "Sorry, we couldn't find that booking in our system." });
  }
  if (err.message.includes("already exists")) {
    return res
      .status(400)
      .json({ message: "This booking already exists in our system." });
  }
  if (err.name === "PrismaClientKnownRequestError") {
    return res
      .status(400)
      .json({ message: "There was an issue with your request." });
  }
  if (err.message.includes("required")) {
    return res
      .status(400)
      .json({ message: "Please fill in all required information." });
  }
  if (err.name === "PrismaClientValidationError") {
    return res
      .status(400)
      .json({ message: "The booking information provided is not valid." });
  }

  res.status(500).json({
    message:
      "Sorry! We're experiencing technical difficulties with the booking system.",
  });
};

export default errorHandler;
