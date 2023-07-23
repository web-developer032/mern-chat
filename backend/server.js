require("dotenv").config();

const connectDB = require("./db");
const app = require("./app");

// --------------------------------
const init = async () => {
    let isDBConnected = await connectDB();

    if (isDBConnected) {
        const PORT = process.env.PORT ?? 5000;
        app.listen(PORT, () => {
            console.log("STARTING SERVER AT PORT: ", PORT);
        });
    }
};

init();
