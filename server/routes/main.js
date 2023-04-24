const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const pythonController = require("../controllers/python");
const youtubeApiController = require("../controllers/youtubeApi")

// Main Routes - simplified for now
router.get("/", homeController.getIndex);

// Auth routes
// router.get("/login", authController.getLogin);
// router.get("/signup", authController.getSignup);
// router.get("/logout", authController.logout);
// router.post("/login", authController.postLogin);
// router.post("/signup", authController.postSignup);

// Auth routes
router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// Python routes
router.post('/runPython', pythonController.runPython);

// Youtube API
router.post('/holdForReview', youtubeApiController.holdForReview)
router.post('/reportSpam', youtubeApiController.reportSpam)


module.exports = router;