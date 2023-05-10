const Joi = require("joi");
const logger = require("../logger");
const dao = require("../DAO/user.dao");
const { json } = require("express");
function noUser(id) {
  res.status(400).send(`There is no user with id ${id}`);
}
//validates the request body for their type,length etc.
function validateUser(user) {
  logger.info("Entered validate user");
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    first_name: Joi.string().min(3).max(15).required(),
    last_name: Joi.string().min(3).max(15).required(),
    email_id: Joi.string().email().required(),
  });
  return schema.validate(user);
}
//function returns all the users in the db
//this is user.service.js
async function getAllUsers(req, res) {
  try {
    logger.info("entered getallusers");
    console.log("Entered getallSers");
    const users = await dao.getAllUsers();
    res.send({ status: 200, data: users, message: "Retreived all users" });
  } catch (err) {
    logger.error(err);
    res.status(500).send(`An error occurred while getting all users`);
  }
}
//function returns a specific user corresponding to the id of the request
async function getUserById(req, res) {
  try {
    logger.info("entered getuserbyid");
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      logger.error("Invalid user id");
      res.status(400).send("Invalid user id");
      return;
    }
    logger.info(`Entered id in the request ${id}`);
    const user = await dao.getUserById(id);
    if (!user) {
      logger.error("No such User for with specific id");
      res.status(400).send({
        status: 400,
        data: [],
        message: "No such user",
      });
    } else {
      res.status(200).send({
        status: 200,
        data: user,
        message: "User found",
      });
    }
  } catch (err) {
    console.log(err);
    logger.error("Error finding user ");
    res
      .status(500)
      .send({ status: 500, message: "An error occured in  finding the user" });
  }
}
//function returns a random user from the database
async function getRandomUser(req, res) {
  try {
    // console.log("entered first layer");
    logger.info("entered randomuser");
    const randomUser = await dao.getRandomUser();
    // res.send(randomUser);
    res.status(200).send({
      status: 200,
      data: randomUser,
      message: "A random user",
    });
  } catch (err) {
    logger.error("Some error occured getting a random user");
    res.status(500).send("An error occurred while getting a random user");
  }
}
//function takes in new user details and adds it to the db
async function addUser(req, res) {
  try {
    logger.info("entered adduser");
    const newUser = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_id: req.body.email_id,
    };
    const { error } = validateUser(req.body);
    if (error) {
      logger.error("Not valid user details", error.details[0].message);
      res.send(`Please enter valid user details\n${error.details[0].message}`);
    } else {
      const user = await dao.addUser(newUser);
      res.send({ status: 201, data: newUser, message: "Created new user" });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send(`An error occurred while adding a user `);
  }
}

async function updateUser(req, res) {
  try {
    logger.log("entered updateuser");
    const id = parseInt(req.params.id);
    const updatedUser = {
      id: parseInt(req.params.id),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email_id: req.body.email_id,
    };

    const user = await dao.updateUser(id, updatedUser);
    if (!user) {
      res.status(400).send(`There is no user with id ${updatedUser.id}`);
    } else {
      res.send(
        //`Updated user\n ${user}`
        {
          status: 200,
          data: updatedUser,
          message: "Succesfully updated the user",
        }
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating a user");
  }
}

async function deleteUser(req, res) {
  try {
    logger.log("entered deleteuser");
    const deletedUser = await dao.deleteUser(parseInt(req.params.id));
    if (!deletedUser) {
      res
        .status(400)
        .send(`There is no user with id ${parseInt(req.params.id)}`);
      // noUser(parseInt(req.params.id));
    } else {
      res.send(
        {
          status: 200,
          data: deletedUser,
          message: "The above user is deleted succesfully",
        }
        //`User with id ${parseInt(req.params.id)} deleted successfully`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting a user");
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getRandomUser,
  addUser,
  updateUser,
  deleteUser,
  validateUser,
};

//
// 1.validation;
// 2.exception handling-try catch
// 3.look up about error middleware
// 4.environment variables

//TODO  CHECK exception handling again
