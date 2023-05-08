<<<<<<< HEAD
import { genSalt, hash as _hash, compare } from "bcrypt";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
=======
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
>>>>>>> main-holder
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
<<<<<<< HEAD
  genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    _hash(user.password, salt, (err, hash) => {
=======
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
>>>>>>> main-holder
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
<<<<<<< HEAD
  compare(candidatePassword, this.password, (err, isMatch) => {
=======
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
>>>>>>> main-holder
    cb(err, isMatch);
  });
};

<<<<<<< HEAD
export default model("User", UserSchema);
=======
module.exports = mongoose.model("User", UserSchema);
>>>>>>> main-holder
