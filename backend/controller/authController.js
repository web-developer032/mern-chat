const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/UserModel");
const { resizePhoto } = require("./fileController");

const USERS_IMAGE_PATH = "public/userImages";

const createToken = (payload, secret, expire) =>
    jwt.sign(
        payload, // PAYLOAD
        secret, // SECRET
        // OPTIONS FOR LOGIN
        {
            // expiresIn: process.env.JWT_EXPIRE_TIME,
            expiresIn: expire,
        }
    );

function generateAccessToken(payload) {
    return createToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRE);
}

function generateRefreshToken(payload) {
    return createToken(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRE);
}

const createAndSendToken = (user, statusCode, res) => {
    // const token = createToken(
    //     { id: user._id },
    //     process.env.JWT_SECRET,
    //     process.env.JWT_EXPIRE_TIME
    // );

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    // Calculate expiration time in seconds
    const expirationInSeconds = parseInt(process.env.JWT_COOKIE_TIME || 1) * 24 * 60 * 60;

    const cookieOptions = {
        expires: new Date(Date.now() + expirationInSeconds * 1000),
        sameSite: "None", // cross-site cookie
        httpOnly: true, // this means cookie cannot be modified or accessed by the browser
        // secure: true, // this means cookie will only be used on HTTPS connection not on HTTP
    };

    if (process.env.NODE_ENV === "PRODUCTION") cookieOptions.secure = true; // this means cookie will only be used on HTTPS connection not on HTTP

    res.cookie("jwt", refreshToken, cookieOptions);

    res.status(statusCode).json({
        status: true,
        token: accessToken,
        data: user,
    });
};

const getUserByDecodedData = async (decodedData) => {
    const user = await UserModel.findById(decodedData.id);

    if (!user) return next("User doesn't exist anymore!");

    if (user.changedPassword(decodedData.iat))
        return next("Password changed recently. Please Login again.");

    return user;
};

const refreshToken = catchAsync(async (req, res, next) => {
    const cookies = req.cookies;
    console.log("REFRESH COOKIES: ", cookies);

    if (!cookies?.jwt)
        return res.status(401).json({
            status: false,
            message: "Unauthorized",
        });

    const refreshToken = cookies.jwt;

    const decodedData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (decodedData?.id) {
        const user = await getUserByDecodedData(decodedData);

        const accessToken = generateAccessToken({ id: user._id });

        return res.status(200).json({
            status: true,
            token: accessToken,
            data: user,
        });
    }

    return res.status(401).json({
        status: false,
        message: "Unauthorized",
    });
});

const protectRoute = catchAsync(async (req, res, next) => {
    // 1) CHECK TOKEN IF IT EXISTS
    let token;
    // console.log("req.headers.authorization: ",req.headers.authorization)
    // console.log("req.headers.Authorization: ",req.headers.Authorization)
    console.log((req.headers.authorization || req.headers.Authorization)?.startsWith("Bearer"));
    if ((req.headers.authorization || req.headers.Authorization)?.startsWith("Bearer")) {
        token = (req.headers.authorization || req.headers.Authorization).split(" ")[1];
    }

    if (!token) return next("Unauthorized!");

    console.log("PROTECTED TOKEN: ", token);
    // 2) VERIFY TOKEN
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decodedData?.id) {
        // 3) CHECK IF USER STILL EXISTS
        const user = await getUserByDecodedData(decodedData);

        req.user = user;

        // GRANT ACCESS TO PROTECTED ROUTE
        return next();
    }
    return next("Unauthorized!");
});

const signupUser = catchAsync(async (req, res, next) => {
    const { name, email, password, profile } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            status: false,
            message: "Please provide all the required fields.",
        });
    }

    //check user credentials here
    const user = await UserModel.findOne({ email }).exec();
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
            const filename = `${USERS_IMAGE_PATH}/user-${user._id}.webp`;
            user.profile = filename;

            await Promise.allSettled([
                resizePhoto(req, filename, 500, 500, "webp", 90),
                user.save(),
            ]);
        }

        user.active = undefined;
        // WE DON'T WANT THE USER TO SEE THE PASSWORD
        user.password = undefined;

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
        // WE DON'T WANT THE USER TO SEE THE PASSWORD
        user.password = undefined;

        return createAndSendToken(user, 200, res);
    }

    return res.status(400).json({
        status: false,
        message: "Wrong email or password",
    });
});

const logoutUser = catchAsync(async (req, res, next) => {
    const cookies = req.cookies;
    console.log("LOGOUT COOKIES: ", cookies);

    if (!cookies?.jwt) return res.sendStatus(204); // NO CONTENT

    res.clearCookie("jwt", null, {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "PRODUCTION",
    });

    res.status(200).json({
        status: true,
        message: "User logged out successfully.",
    });
});

const loginUsingToken = catchAsync(async (req, res, next) => {
    let token;
    if ((req.headers.authorization || req.headers.Authorization)?.startsWith("Bearer")) {
        token = (req.headers.authorization || req.headers.Authorization).split(" ")[1];
    }

    console.log("TOKEN: ", token);
    if (token) {
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

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

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    loginUsingToken,
    protectRoute,
    refreshToken,
};
