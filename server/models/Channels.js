import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const ChannelSchema = new Schema({
  smChannelID: String,
  createdBy: { type: ObjectId, unique: true },
});

export default model("Channel", ChannelSchema);
