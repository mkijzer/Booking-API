import "dotenv/config";
import express from "express";
import * as Sentry from "@sentry/node";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import amenitiesRouter from "./routes/amenities.js";
import notFoundErrorHandler from "./middleware/notFoundErrorHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import log from "./middleware/logMiddleWare.js";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(express.json());

app.use(log);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);
app.use("/amenities", amenitiesRouter);

app.get("/", (req, res) => {
  res.send("Welcome in the Booking API");
});

app.get("/debug-sentry", (req, res) => {
  throw new Error("This is a test error!");
});

app.use(notFoundErrorHandler);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
