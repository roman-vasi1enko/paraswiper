const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  smChannelID: String,
  createdBy: { type: ObjectId, unique: true },
});

module.exports = mongoose.model("Channel", ChannelSchema);