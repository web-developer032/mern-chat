const express = require("express");
const UserModel = require("../../models/UserModel");
const catchAsync = require("../../utils/catchAsync");
const { signupUser, loginUser, loginUsingToken } = require("../../controller/authController");

const { uploadUserPhoto } = require("../../controller/fileController");

const router = express.Router();

// ------------------
// CREATE USER
// ------------------
router.route("/signup").post(uploadUserPhoto.single("profile"), signupUser);

// ------------------
// GET USER
// ------------------
router.route("/login").post(loginUser);
router.route("/loginUsingToken").get(loginUsingToken);

module.exports = router;
