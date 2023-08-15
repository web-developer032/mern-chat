const rateLimit = require("express-rate-limit");

// GLOBAL MIDDLEWARE: LIMIT REQUEST
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: "Too many requests detected from your IP! Please try again after one hour.",
});

function requestLimitGenerator(minutes, requestsLimits, message) {
    return rateLimit({
        max: requestsLimits,
        windowMs: minutes * 60 * 1000, // 1 Hour
        message: `Too many requests detected from your IP! Please try again after ${message}.`,
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
}

module.exports = requestLimitGenerator;
