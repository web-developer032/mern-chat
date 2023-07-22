const mongoose = require("mongoose");

module.exports = async function connectDB() {
    try {
        const DBURL =
            process.env.NODE_ENV === "development" ? process.env.DBLOCAL : process.env.DBLIVE;
        await mongoose.connect(DBURL);

        console.log("DATABASE CONNECTED TO: ", DBURL);
        return true;
    } catch (error) {
        console.log("DATABASE CONNECTION ERROR: ", err);
        return false;
    }
};
