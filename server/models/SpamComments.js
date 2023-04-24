const mongoose = require("mongoose");

const SpamCommentSchema = new mongoose.Schema({
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

module.exports = mongoose.model("SpamComments", SpamCommentSchema);