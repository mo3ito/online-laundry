const multer = require("multer");

const storageMulter = (pathDir, model, additionalFolderName) => {
const storageMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images/clothing-category"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
}

module.exports = storageMulter;

