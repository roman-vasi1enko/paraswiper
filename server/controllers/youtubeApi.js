import { existsSync, readFileSync } from 'fs';
import { google } from 'googleapis';
import SpamComments from '../models/SpamComments.js';
import dotenv from 'dotenv'
dotenv.config()

export async function getVideoData(req, res) {

    const videoInfoAPI = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${req.body.videoUrl}&key=${process.env.YOUTUBE_API}`;

    let response = await fetch(videoInfoAPI)
        .then(res => res.json())
        .catch(err => {
            console.log(`error ${err}`);
        });

    res.json(response);
}
export async function holdForReview(req, res) {
    const selectedComments = req.body.selectedComments;

    try {
        // Load the existing credentials from the token.pickle file
        const token = process.env.TOKEN_PICKLE ? process.env.TOKEN_PICKLE : existsSync('./server/config/token.pickle') ? readFileSync('./server/config/token.pickle') : null;
        const credentials = token ? JSON.parse(token) : null;

        // Check that the credentials contain a valid client ID and secret
        if (!credentials || !credentials.client_id || !credentials.client_secret) {
            throw new Error('Invalid credentials');
        }

        // Create a new OAuth2 client with the existing credentials
        const oauth2Client = new google.auth.OAuth2(
            credentials.client_id,
            credentials.client_secret);
        oauth2Client.setCredentials(credentials);

        // Use the OAuth2 client to access the YouTube API
        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client,
        });
        const response = await youtube.comments.setModerationStatus({
            id: selectedComments,
            moderationStatus: 'heldForReview',
            banAuthor: false,
        });

        // Return the response from the YouTube API
        // console.log(`From Youtube API (node): ${JSON.stringify(response)}`)
        if (response.status === 200 || response.status === 204) {
            await selectedComments.map((commentID, i) => SpamComments.findOneAndUpdate({ commentID: commentID }, { deleted: true })
                .then(console.log(`${i + 1}. ${commentID} deleted and updated`))
                .catch(err => console.log(err)));
        }
        console.log(response.status);
        res.json(response);
    } catch (error) {
        // Handle any errors from the YouTube API
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
export async function reportSpam(req, res) {
    const selectedComments = req.body.selectedComments;

    try {
        // Load the existing credentials from the token.pickle file
        const token = process.env.TOKEN_PICKLE ? process.env.TOKEN_PICKLE : existsSync('./server/config/token.pickle') ? readFileSync('./server/config/token.pickle') : null;
        const credentials = token ? JSON.parse(token) : null;

        // Check that the credentials contain a valid client ID and secret
        if (!credentials || !credentials.client_id || !credentials.client_secret) {
            throw new Error('Invalid credentials');
        }

        // Create a new OAuth2 client with the existing credentials
        const oauth2Client = new google.auth.OAuth2(
            credentials.client_id,
            credentials.client_secret);
        oauth2Client.setCredentials(credentials);

        // Use the OAuth2 client to access the YouTube API
        const youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client,
        });
        const response = await youtube.comments.markAsSpam({
            id: selectedComments
        });

        // Return the response from the YouTube API
        // console.log(`From Youtube API (node): ${JSON.stringify(response)}`)
        if (response.status === 200 || response.status === 204) {
            await selectedComments.map((commentID, i) => SpamComments.findOneAndUpdate({ commentID: commentID }, { reported: true })
                .then(console.log(`${i + 1}. ${commentID} reported and updated`))
                .catch(err => console.log(err)));
        }
        console.log(response.status);
        res.json(response);

    } catch (error) {
        // Handle any errors from the YouTube API
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}