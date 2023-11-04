const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const globalErrorHandler = require("./controller/errorController");
const userRouter = require("./routes/user/userRouter");
const requestLimitGenerator = require("./utils/requestLimiter");

const app = express();

// IMPLEMENTING CORS SO THAT OTHER WEBSITES CANNOT USE OUR API
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        credentials: true,
    })
); // THIS WILL WORK FOR SIMPLE REQUESTS LIKE (GET AND POST) BUT NOT FOR (PATCH, DELETE or PUT). or for cookies

// FOR NON-SIMPLE REQUEST WE USE app.options request.
// app.options(
//     "*",
//     cors({
//         origin: "http://127.0.0.1:5173",
//     })
// ); // app.options() is just like app.get or post etc.

app.use(cookieParser()); // TO READ COOKIES SENT FROM CLIENT

app.use(express.static(`${__dirname}/public`)); // to access files from the server. (STATIC FILES)
app.use(express.json({ limit: "10kb" })); // to use data that is sent by user from front-end. limit the data to 10kb that user can sent.
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // TO USE DATA COMING FROM FRONTEND BY SUBMITTING FORM

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/", requestLimitGenerator(60, 100, "one hour"));

app.use("/api/user", userRouter);

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: false,
        data: "Invalid URL.",
    });
});

app.use(globalErrorHandler);

module.exports = app;
