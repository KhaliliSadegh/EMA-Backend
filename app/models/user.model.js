const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    street: {
      type: String,
    },
    nr: {
      type: String,
    },
    plz: {
      type: String,
    },
    ort: {
      type: String,
    },
    country: {
      type: String,
    },
    position: {
      type: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    comments: [{
      comment: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
      author: 		{type: Schema.Types.Mixed}
    }]
  })
);

module.exports = User;
