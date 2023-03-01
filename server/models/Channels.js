const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  channelID: { type: ObjectId, unique: false },
  createdBy: { type: ObjectId, unique: true },
});

module.exports = mongoose.model("User", UserSchema);