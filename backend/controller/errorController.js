function globalErrorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let message = err;

    if (err.type === "entity.parse.failed")
        return res.status(statusCode).send({ status: false, message: "Invalid Data" });

    console.log("GLOBAL ERROR NAME: ", err.name);
    console.log("GLOBAL ERROR type: ", err.type);
    console.log("GLOBAL ERROR MESSAGE: ", err.message);
    console.log("GLOBAL ERROR HANDLER: ", err);

    if (err.message.startsWith("Multipart")) {
        statusCode = 400;
        message = "Invalid Data";
    }

    // HANDLE JSON WEB TOKEN EXPIRE
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        message = "Invalid Token!";
        statusCode = 401;
    }

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((el) => el.message);

        message = `Invalid data: ${errors.join(". ")}`;
        statusCode = 422;
    }

    if (err.code === 11000) {
        let key;
        for (const k in err.keyValue) {
            key = k;
            break;
        }

        const value = err.keyValue[key];
        message = `Duplicate field value: ${value}. Please try another ${key}! `;
    }

    res.status(statusCode).send({
        status: false,
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}

module.exports = globalErrorHandler;
