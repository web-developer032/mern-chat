require("dotenv").config();

const express = require("express");
const connectDB = require("./db");

const app = express();

(async () => {
    let isDBConnected = await connectDB();

    if (isDBConnected) {
        const PORT = process.env.PORT ?? 5000;
        app.listen(PORT, () => {
            console.log("STARTING SERVER AT PORT: ", PORT);
        });
    }
})();
