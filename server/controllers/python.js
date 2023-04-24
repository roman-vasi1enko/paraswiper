const {PythonShell} = require('python-shell')

const path = require('path');
const SpamComments = require("../models/SpamComments");
const AllComments = require("../models/AllComments");

let twoStepBack=path.join(__dirname,'../../');

module.exports = {
    runPython: (req, res) => {
        console.log(Object(req.body.videoID.id))
        
        let options = {
            args: [Object(req.body.videoID.id), Object(req.body.videoID.snippet.title)]
        }
        
        PythonShell.run('./corePyApp/Swiper.py', options).then(async messages => {
            
            let spamComments = JSON.parse(messages[0])
            let allComments = JSON.parse(messages[1])
            let scanTotals = {
                scannedCommentsCount: Number(messages[2]),
                scannedRepliesCount: Number(messages[3]),
                spamCommentsCount: Object.keys(spamComments).length
            }

            let spamCommentsCache = []

            if (scanTotals.spamCommentsCount > 0) {
                for (let comment in spamComments) {
                    let comID = spamComments[comment]
                    spamCommentsCache.push({
                        commentID: comment,
                        text: comID.text,
                        textUnsanitized: comID.textUnsanitized,
                        authorName: comID.authorName,
                        authorID: comID.authorID,
                        authorProfilePic: comID.authorProfilePic,
                        videoID: comID.videoID,
                        matchReason: comID.matchReason,
                        originalCommentID: comID.originalCommentID,
                        timestamp: comID.timestamp,
                        deleted: false,
                        reported: false,
                    })
                }
                // await SpamComments.deleteMany({__v: 0})
                await SpamComments.insertMany(spamCommentsCache, {ordered: false})
                    .then(() => console.log("Spam comments have been added!"))
                    .catch(err => console.log(err));
            }

            let allCommentsCache = []

            if (scanTotals.scannedCommentsCount + scanTotals.scannedRepliesCount > 0) {
                for (let author in allComments) {
                    let authorID = allComments[author]
                    authorID.map(arr => allCommentsCache.push({
                        authorID: arr.authorChannelID,
                        parentAuthorID: arr.parentAuthorChannelID,
                        authorName: arr.authorChannelName,
                        text: arr.commentText,
                        commentID: arr.commentID,
                        authorProfilePic: arr.authorProfilePic,
                        videoID: arr.videoID,
                        originalCommentID: arr.originalCommentID,
                        timestamp: arr.timestamp,
                        }))
                }

                // await AllComments.deleteMany({__v: 0})
                await AllComments.insertMany(allCommentsCache, {ordered: false})
                    .then(() => console.log("All comments have been added!"))
                    .catch(err => console.log(err));
            }

            // await SpamComments.deleteMany({__v: 0})
            // await AllComments.deleteMany({__v: 0})


            // res.send([spamCommentsCache, allCommentsCache, scanTotals])
            // return [spamComments, allComments, scanTotals]
            // res.redirect("localhost:3000/results");
            // return res.sendFile(twoStepBack + '/client/public/index.html');
            res.json([spamCommentsCache, allCommentsCache, scanTotals])

            }).catch(err => res.send(err))
    }
}