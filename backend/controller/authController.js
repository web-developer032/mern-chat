const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/UserModel");

const createToken = (id) =>
    jwt.sign(
        { id }, // PAYLOAD
        process.env.JWT_SECRET, // SECRET
        // OPTIONS FOR LOGIN
        {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        }
    );

const createAndSendToken = (user, statusCode, res) => {
    const token = createToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true, // this means cookie cannot be modified or accessed by the browser
        // secure: true, // this means cookie will only be used on HTTPS connection not on HTTP
    };

    if (process.env.NODE_ENV === "PRODUCTION") cookieOptions.secure = true; // this means cookie will only be used on HTTPS connection not on HTTP

    res.cookie("jwt", token, cookieOptions);

    // WE DON'T WANT THE USER TO SEE THE PASSWORD
    user.password = undefined;

    res.status(statusCode).json({
        status: true,
        token,
        data: user,
    });
};

const signupUser = catchAsync(async (req, res, next) => {
    const { name, email, password, profile } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            status: false,
            message: "Please provide all the required fields.",
        });
    }

    //check user credentials here
    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({
            status: false,
            message: "User already exists with this email.",
        });
    } else {
        const user = await UserModel.create({
            name,
            email,
            password,
            profile,
        });

        createAndSendToken(user, 201, res);
    }
});

const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) CHECK IF EMAIL AND PASSWORD EXISTS
    if (!email || !password) return next("Email and Password is required!");

    // 2) CHECK IF USER EXISTS AND PASSWORD IS CORRECT
    const user = await UserModel.findOne({ email }).select("+password -__v");

    // 3) CHECK IF EXERYTHING IS CORRECT, SEND THE TOKEN
    if (user && (await user.checkPassword(password))) {
        return createAndSendToken(user, 200, res);
    }

    return res.status(400).json({
        status: false,
        message: "Wrong email or password",
    });
});

module.exports = {
    signupUser,
    loginUser,
};
