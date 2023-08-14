const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/UserModel");
const { resizeUserProfile } = require("./fileController");

const createToken = (id) =>
    jwt.sign(
        { id }, // PAYLOAD
        process.env.JWT_SECRET, // SECRET
        // OPTIONS FOR LOGIN
        {
            // expiresIn: process.env.JWT_EXPIRE_TIME,
            expiresIn: "10s",
        }
    );

const createAndSendToken = (user, statusCode, res) => {
    const token = createToken(user._id);
    // Calculate expiration time in seconds
    const expirationInSeconds = process.env.JWT_COOKIE_TIME * 24 * 60 * 60;

    const cookieOptions = {
        expires: new Date(Date.now() + expirationInSeconds * 1000),
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

        if (req.file) {
            const filename = await resizeUserProfile(req, user._id);
            user.profile = filename;

            await user.save();
        }

        user.active = undefined;

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

const loginUsingToken = catchAsync(async (req, res, next) => {
    const token = req.query.token;

    if (req.query.token && req.query.token !== "null") {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedData?.id) {
            const user = await UserModel.findById(decodedData.id).select("-password -__v");

            if (user) {
                return res.status(200).json({
                    status: true,
                    data: user,
                });
            } else {
                return res.status(401).json({
                    status: false,
                    message: "User doesn't exist anymore!",
                });
            }
        }
    }
    return res.status(401).json({
        status: false,
        message: "Unauthorized!",
    });
});

const protectRoute = catchAsync(async (req, res, next) => {
    // 1) CHECK TOKEN IF IT EXISTS
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) return next("Please Login First.");

    // 2) VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) CHECK IF USER STILL EXISTS
    const user = await UserModel.findById(decoded.id);

    if (!user) return next("User doesn't exist anymore!");

    // 4) CHECK IF USER CHANGED PASSWORD AFTER TOKEN WAS ISSUED
    if (user.changedPassword(decoded.iat))
        return next(new AppError("Password changed recently. Please Login again.", 401));

    req.user = user;

    // GRANT ACCESS TO PROTECTED ROUTE
    next();
});

module.exports = {
    signupUser,
    loginUser,
    loginUsingToken,
    protectRoute,
};
