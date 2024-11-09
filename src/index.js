import express from "express";
import usersRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import notFoundErrorHandler from "./middleware/NotFoundErrorHandler.js";

import "dotenv/config";

//Import route files later underneath

const app = express();

app.use(express.json());

// app.use(log);

app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);

app.get("/", (req, res) => {
  res.send("Welcome in the Booking API");
});

//More error handeling underneath later

app.use(notFoundErrorHandler);

// General error handler for unexpected errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Oops! Something went wrong. Please try again later.",
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
