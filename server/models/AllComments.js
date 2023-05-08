import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
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

export default model("AllComments", CommentSchema);
