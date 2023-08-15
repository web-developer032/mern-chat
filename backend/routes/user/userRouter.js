const express = require("express");
const UserModel = require("../../models/UserModel");
const catchAsync = require("../../utils/catchAsync");
const authController = require("../../controller/authController");

const { uploadSinglePhoto } = require("../../controller/fileController");
const requestLimitGenerator = require("../../utils/requestLimiter");

const router = express.Router();

// ------------------
// CREATE USER
// ------------------
router
    .route("/signup")
    .post(
        requestLimitGenerator(1, 5, "one minute"),
        uploadSinglePhoto.single("profile"),
        authController.signupUser
    );

// ------------------
// GET USER
// ------------------
router.route("/login").post(requestLimitGenerator(1, 5, "one minute"), authController.loginUser);

router.route("/loginUsingToken").get(authController.loginUsingToken);

router.route("/refresh").get(authController.refreshUser);

module.exports = router;
