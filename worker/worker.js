import throng from 'throng';
import Queue from "bull";
import { PythonShell } from 'python-shell';

// Connect to a local redis instance locally, and the Heroku-provided URL in production
// let REDIS_URL = process.env.REDIS_URL || "redis://localhost:3000";
let REDIS_URL = process.env.REDIS_URL;

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
let workers = process.env.WEB_CONCURRENCY || 5;

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network 
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
let maxJobsPerWorker = 5;

function startWorker() {
    let workQueue = new Queue('runPython', REDIS_URL);
    
    workQueue.process(maxJobsPerWorker, async (job) => {
        let video = job.data.video;
        
        let options = {
            args: [video.id, video.snippet.title]
        }

        try {
            const messages = await PythonShell.run('./worker/corePyApp/Swiper.py', options)

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
            }

            return [spamCommentsCache, allCommentsCache, scanTotals];

        } catch (error) {
            console.log(`worker.js : 101 -> PythonShell.run(): ${err}`)
        }
        
        
    });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ 
    workers: workers, 
    lifetime: Infinity,
    start: startWorker
});