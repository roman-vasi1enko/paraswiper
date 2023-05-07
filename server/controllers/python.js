import Queue from 'bull';
import SpamComments from "../models/SpamComments.js";
import AllComments from "../models/AllComments.js";

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';


let workQueue = new Queue('runPython', REDIS_URL);
let scanResult = [];

export async function runPython(req, res) {

    try {
        let job = await workQueue.add({ video: req.body.videoID });
        res.json({ id: job.id });

        scanResult = await job.finished();

        // Add spam comments to MongoDB
        await SpamComments.insertMany(scanResult[0], { ordered: false })
            .then(() => console.log("Spam comments have been added!"))
            .catch(err => console.log(`SpamComments.insertMany(): ${err}`));

        // Add all comments to MongoDB
        await AllComments.insertMany(scanResult[1], { ordered: false })
            .then(() => console.log("All comments have been added!"))
            .catch(err => console.log(`AllComments.insertMany(): ${err}`));

        console.log('python.js : 26 : scanTotals:');
        console.log(scanResult[2]);

    } catch (error) {
        console.log('python.js : 34');
        console.log(error);
        res.send(error);
    }
}
export async function sendResult(req, res) {
    if (scanResult.length === 0) {
        res.json('not ready');
    }
    else {
        res.json(scanResult);
        scanResult = [];
    }
}