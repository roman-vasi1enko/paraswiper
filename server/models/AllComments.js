<<<<<<< HEAD
import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
=======
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
>>>>>>> main-holder
  [{
    authorID: String,
    parentAuthorID: String,
    authorName: String,
    text: String,
    commentID: {type: String, unique: true},
    authorProfilePic: String,
    videoID: String,
    originalCommentID: String,
    timestamp: String,
  }],
);

<<<<<<< HEAD
export default model("AllComments", CommentSchema);
=======
module.exports = mongoose.model("AllComments", CommentSchema);
>>>>>>> main-holder
