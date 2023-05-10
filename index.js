const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/USERS")
  .then(() => console.log("Successfully connected to db"))
  .catch((err) => console.log("ould not connect to the db", err));
const schema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email_id: String,
});
var firstName, lastName, email, uid;
uid = 1;
firstName = "ajish";
lastName = "kumar";
email = "k.ajish@limtus7.com";
var User = mongoose.model("User", schema);
//
//
//function to create a user
async function createUser() {
  var user = new User({
    id: uid,
    first_name: firstName,
    last_name: lastName,
    email_id: email,
  });
  var result = await user.save();
  console.log("The user added now is", result);
}
//
//
//function getAllUsers
async function geAlltUser() {
  console.log("fn. getallusers");
  const users = await User.find();
  console.log("from function getallusers");
  console.log(users);
}
//
//
//function to get a user by id
async function getUserById(u_id) {
  const user = await User.find({ id: u_id });
  //   console.log(user);
  console.log(
    `User is \n First name:${user[0].first_name}\n Last name:${user[0].last_name}\n Email:${user[0].email_id}`
  );
}
//
//
//the data which needs to be updated
//function to update a user
// var newFName, newLName, newEmail;
// Update only the email and firstname attributes dynamically
updates = {
  email_id: "new.@example.com",
  first_name: "UPDATED jishnu",
};
//
//
//function to update documents
async function updateUser(u_id, updates) {
  console.log(updates);
  try {
    const user = await User.findOne({ id: u_id });
    if (!user) {
      console.log("No such user Check the id again");
      return;
    }

    for (const [key, value] of Object.entries(updates)) {
      user[key] = value;
    }

    const result = await user.save();
    console.log("User updated succesfully", result);
  } catch (err) {
    console.log("Couldn't update user info", err);
  }
}
//
//
//function to remove user
async function removeUser(u_id) {
  const result = await User.deleteOne({ id: u_id });
  console.log(result);
}

//function calls
//geAlltUser();
//createUser();
//getUserById(3);
//updateUser(2, updates);
//removeUser(3);
