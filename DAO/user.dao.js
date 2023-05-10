const User = require("../models/user.model");
const logger = require("../logger");
//this is user.dao.js
async function getAllUsers() {
  try {
    logger.info("entered service layer");
    const users = await User.find();
    return users;
  } catch (err) {
    console.error(err);
    throw new Error("An error occurred while getting all users");
  }
}

async function getUserById(id) {
  try {
    console.log("entered service layer");
    const user = await User.findOne({ id: id });
    console.log(user);
    return user;
  } catch (err) {
    throw new Error(`An error occurred while getting user with id ${id}`);
  }
}

async function getRandomUser() {
  try {
    console.log("entered service layer");
    const count = await User.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomUser = await User.findOne().skip(randomIndex);
    return randomUser;
  } catch (err) {
    throw new Error("An error occurred while getting a random user");
  }
}

async function addUser(user) {
  try {
    console.log("entered service layer");
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error("An error occurred while adding a new user");
  }
}

async function updateUser(id, updatedUser) {
  try {
    console.log("entered service layer");
    console.log(updatedUser);
    const user = await User.findOne({ id: id });
    for (const [key, value] of Object.entries(updatedUser)) {
      user[key] = value;
    }
    const result = await user.save();
    return result;
  } catch (err) {
    throw new Error(`An error occurred while updating user with id ${id}`);
  }
}

async function deleteUser(id) {
  try {
    console.log("entered service layer");
    const user = await User.findOne({ id: id });
    if (!user) {
      return null; // return null if user not found
    }
    const result = await user.remove(); // remove the user
    console.log(result);
    return result;
  } catch (err) {
    throw new Error(`An error occurred while deleting user with id ${id}`);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getRandomUser,
  addUser,
  updateUser,
  deleteUser,
};
