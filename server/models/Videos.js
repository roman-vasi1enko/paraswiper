const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  smChannelID: String,
  smVideoID: String,
  totalComments: Number,
  checked: Boolean,
  dateLastChecked: Date,
});

module.exports = mongoose.model("Video", VideoSchema);