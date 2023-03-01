const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");

// Main Routes - simplified for now
router.get("/", homeController.getIndex);

// Auth routes
// router.get("/login", authController.getLogin);
// router.get("/signup", authController.getSignup);
// router.get("/logout", authController.logout);
// router.post("/login", authController.postLogin);
// router.post("/signup", authController.postSignup);

// BLASKE's Auth routes
router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);

router.post('/login', authController.login);
router.post('/signup', authController.signup);


module.exports = router;