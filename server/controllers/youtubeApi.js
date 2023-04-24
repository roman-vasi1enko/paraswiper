const fs = require('fs');
const { google } = require('googleapis');
const { authenticate } = require("@google-cloud/local-auth");
const SpamComments = require("../models/SpamComments");

module.exports = {

    holdForReview: async (req, res) => {
        // const { id, moderationStatus } = req.body;
        const selectedComments = req.body.selectedComments;

        try {
            // Load the existing credentials from the token.pickle file
            const token = fs.existsSync('./corePyApp/token.pickle') ? fs.readFileSync('./corePyApp/token.pickle') : null;
            const credentials = token ? JSON.parse(token) : null;
            // console.log(`token.picle: ${token}`)

            // Check that the credentials contain a valid client ID and secret
            if (!credentials || !credentials.client_id || !credentials.client_secret) {
                throw new Error('Invalid credentials');
            }

            // Create a new OAuth2 client with the existing credentials
            const oauth2Client = new google.auth.OAuth2(
                credentials.client_id,
                credentials.client_secret,
            );
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
                    .then(console.log(`${i+1}. ${commentID} deleted and updated`))
                    .catch(err => console.log(err)))
            }
            console.log(response.status)
            res.json(response);
        } catch (error) {
            // Handle any errors from the YouTube API
            console.error(error);
            res.status(500).json({ error: error.message });
        }   
    },

    reportSpam: async (req, res) => {
        const selectedComments = req.body.selectedComments;

        try {
            // Load the existing credentials from the token.pickle file
            const token = fs.existsSync('./corePyApp/token.pickle') ? fs.readFileSync('./corePyApp/token.pickle') : null;
            const credentials = token ? JSON.parse(token) : null;
            // console.log(`token.picle: ${token}`)

            // Check that the credentials contain a valid client ID and secret
            if (!credentials || !credentials.client_id || !credentials.client_secret) {
                throw new Error('Invalid credentials');
            }

            // Create a new OAuth2 client with the existing credentials
            const oauth2Client = new google.auth.OAuth2(
                credentials.client_id,
                credentials.client_secret,
            );
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
                    .then(console.log(`${i+1}. ${commentID} reported and updated`))
                    .catch(err => console.log(err)))
            }
            console.log(response.status)
            res.json(response);

        } catch (error) {
            // Handle any errors from the YouTube API
            console.error(error);
            res.status(500).json({ error: error.message });
        }   
    }
}