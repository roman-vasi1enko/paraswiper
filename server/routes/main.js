import { Router } from "express";
import { logout, getAuthenticated, login, signup } from "../controllers/auth.js";
import { getIndex } from "../controllers/home.js";
import { runPython, sendResult } from "../controllers/python.js";
import { getVideoData, holdForReview, reportSpam } from "../controllers/youtubeApi.js";

const router = Router();

// Main Routes - simplified for now
router.get("/*", getIndex);

// Auth routes
router.get('/logout', logout);
router.get('/authenticated', getAuthenticated);
router.post('/login', login);
// Signup disabled for now
// router.post('/signup', signup);

// Python routes
router.post('/runPython', runPython);
router.post('/runPython/sendResult/:id', sendResult);

// Youtube API
router.post('/getVideoData', getVideoData)
router.post('/holdForReview', holdForReview)
router.post('/reportSpam', reportSpam)


export default router;