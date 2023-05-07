import { Schema, model } from "mongoose";

const SpamCommentSchema = new Schema({
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

export default model("SpamComments", SpamCommentSchema);