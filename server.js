const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./Controller/user.controller");

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/User_Data")
  .then(() => console.log("Successfully connected to db"))
  .catch((err) => console.log("Could not connect to the db", err));

// Routes
app.use("/api", userRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
