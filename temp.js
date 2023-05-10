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

const express = require("express");
const router = express.Router();
const userController = require("../userService/user.service");

router.get("/users", checkMethod, userController.getAllUsers); //
router.get("/users/:id", userController.getUserById); //checkSpecific,
router.get("/user/random", userController.getRandomUser); //checkGet,
router.post("/users", userController.addUser); //checkMethod,
router.put("/users/:id", userController.updateUser); //checkSpecific,
router.delete("/users/:id", userController.deleteUser); //checkSpecific,
//if an undefined url comes in
router.use((req, res) => {
  res.status(404).send("Page not found"); // no such page
});
module.exports = router;
