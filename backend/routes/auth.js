const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");



router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/login/metamask", authController.metamaskLogin);
router.post("/login/twitter", authController.twitterLogin);
router.post("/reset-password", authController.requestPasswordReset);
router.post("/reset-password/confirm", authController.confirmPasswordReset);

module.exports = router;
