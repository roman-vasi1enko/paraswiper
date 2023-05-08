<<<<<<< HEAD
import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const ChannelSchema = new Schema({
=======
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
>>>>>>> main-holder
  smChannelID: String,
  createdBy: { type: ObjectId, unique: true },
});

<<<<<<< HEAD
export default model("Channel", ChannelSchema);
=======
module.exports = mongoose.model("Channel", ChannelSchema);
>>>>>>> main-holder
