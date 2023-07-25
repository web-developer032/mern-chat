const express = require("express");
const UserModel = require("../../models/UserModel");
const catchAsync = require("../../utils/catchAsync");
const { signupUser, loginUser } = require("../../controller/authController");

const router = express.Router();

// ------------------
// CREATE USER
// ------------------
router.route("/signup").post(signupUser);

// ------------------
// GET USER
// ------------------
router.route("/login").post(loginUser);

module.exports = router;
