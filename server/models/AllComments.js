const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
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

module.exports = mongoose.model("AllComments", CommentSchema);