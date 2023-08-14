const multer = require("multer");
const sharp = require("sharp");

const USERS_IMAGE_PATH = "public/userImages";

// -----------------------------
// FOR STORING FILE DIRECTLY TO DISK (THIS WILL NOT RESIZE)
// -----------------------------
// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, USERS_IMAGE_PATH);
//     },
//     filename: (req, file, cb) => {
//         const imageExtention = file.mimetype.split("/")[1];
//         cb(null, `${file.fieldname}-${Date.now()}.${imageExtention}`);
//     },
// });

// -----------------------------
// FOR STORING FILE IN MEMORY (RAM)
// -----------------------------
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Not an image", false);
    }
};

const resizeUserProfile = async (req, userId) => {
    const filename = `${USERS_IMAGE_PATH}/user-${userId}.webp`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("webp")
        .webp({ quality: 90 })
        .toFile(filename);

    return filename;
};

const uploadUserPhoto = multer({ storage: multerStorage, fileFilter: multerFilter });

module.exports = { uploadUserPhoto, resizeUserProfile };
