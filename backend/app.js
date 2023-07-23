const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// IMPLEMENTING CORS SO THAT OTHER WEBSITES CAN USE OUR API
// app.use(cors()); // THIS WILL WORK FOR SIMPLE REQUESTS LIKE (GET AND POST) BUT NOT FOR (PATCH, DELETE or PUT). or for cookies

// FOR NON-SIMPLE REQUEST WE USE app.options request.
// app.options("*", cors()); // app.options() is just like app.get or post etc.

app.use(cookieParser()); // TO READ COOKIES SENT FROM CLIENT

app.use(express.static(`${__dirname}/public`)); // to access files from the server. (STATIC FILES)
app.use(express.json({ limit: "10kb" })); // to use data that is sent by user from front-end. limit the data to 10kb that user can sent.
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // TO USE DATA COMING FROM FRONTEND BY SUBMITTING FORM

app.get("/", (req, res, next) => {
    console.log("GET REQUEST: ");
});

app.all("*", (req, res, next) => {
    res.status(200).json({
        status: true,
        data: "Invalid URL.",
    });
});

app.use((err, req, res, next) => {
    console.log("GLOBAL ERROR HANDLER: ", err);
    res.status(500).send({ error: "Something went wrong" });
});

module.exports = app;
