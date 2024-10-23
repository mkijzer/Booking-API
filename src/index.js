import express from "express";
import usersRouter from "./routes/users.js";

import "dotenv/config";

//Import route files later underneath

const app = express();

app.use(express.json());

// app.use(log);

//define routes later underneath

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome in the Booking API");
});

//Error handeling underneath later

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
