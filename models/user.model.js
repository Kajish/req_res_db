const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: { type: Number, unique: true },
  first_name: String,
  last_name: String,
  email_id: String,
});

const user = mongoose.model(
  "user",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
  })
);
module.exports = mongoose.model("User", schema);
exports.user = user;
