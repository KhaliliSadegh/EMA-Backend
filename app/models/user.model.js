const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
      },
    email: {
      type: String,
      unique: true,
      required: true
      },
    password: {
      type: String,
      required: true
      },
    firstname:{
      type: String,
      required: true
      },
    lastname:{
      type: String,
      required: true
      },
    address:{
      type: String,
        required: true
      },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
