const multer = require("multer");
const sharp = require("sharp");

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

const resizePhoto = async (req, filename, width, height, photoFormat, quality) => {
    await sharp(req.file.buffer)
        .resize(width, height)
        .toFormat(photoFormat)
        .webp({ quality })
        .toFile(filename);
};

const uploadSinglePhoto = multer({ storage: multerStorage, fileFilter: multerFilter });

module.exports = { uploadSinglePhoto, resizePhoto };
