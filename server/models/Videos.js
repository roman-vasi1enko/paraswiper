import { Schema, model } from "mongoose";

const VideoSchema = new Schema({
  smChannelID: String,
  smVideoID: String,
  totalComments: Number,
  checked: Boolean,
  dateLastChecked: Date,
});

export default model("Video", VideoSchema);