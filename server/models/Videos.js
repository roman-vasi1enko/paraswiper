<<<<<<< HEAD
import { Schema, model } from "mongoose";

const VideoSchema = new Schema({
=======
const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
>>>>>>> main-holder
  smChannelID: String,
  smVideoID: String,
  totalComments: Number,
  checked: Boolean,
  dateLastChecked: Date,
});

<<<<<<< HEAD
export default model("Video", VideoSchema);
=======
module.exports = mongoose.model("Video", VideoSchema);
>>>>>>> main-holder
