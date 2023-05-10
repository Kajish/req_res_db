const express = require("express");
const router = express.Router();
const userService = require("../Service/user.service");

router.get("/users/random", userService.getRandomUser);
router.get("/users", userService.getAllUsers); //
router.get("/users/:id", userService.getUserById); //checkSpecific,
router.post("/users", userService.addUser); //checkMethod,
router.put("/users/:id", userService.updateUser); //checkSpecific,
router.delete("/users/:id", userService.deleteUser); //checkSpecific,
//if an undefined url comes in
router.use((req, res) => {
  res.status(404).send("Page not found"); // no such page
});
module.exports = router;
