<<<<<<< HEAD
import { Schema, model } from "mongoose";

const SpamCommentSchema = new Schema({
=======
const mongoose = require("mongoose");

const SpamCommentSchema = new mongoose.Schema({
>>>>>>> main-holder
    commentID: {type: String, unique: true},
    text: String,
    textUnsanitized: String,
    authorName: String,
    authorID: String,
    authorProfilePic: String,
    videoID: String,
    matchReason: String,
    originalCommentID: String,
    timestamp: String,
    deleted: Boolean,
    reported: Boolean,
});

<<<<<<< HEAD
export default model("SpamComments", SpamCommentSchema);
=======
module.exports = mongoose.model("SpamComments", SpamCommentSchema);
>>>>>>> main-holder
