const multer = require("multer");
const sharp = require("sharp");

const uploadUserPhoto = multer({ dest: "/public/userImages" });
