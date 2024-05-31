const multer = require("multer");
const path = require("path");
const fs = require("fs");
const imageFormater = require("../middlewares/imageFormater"); 

const storageMulter = async (pathDir, model, additionalFolderName) => {
  return multer({
    storage: multer.diskStorage({
      destination: async (req, file, cb) => {
        try {
          const isAdmin = await model.findById(req.headers.authorization);
          if (!isAdmin) {
            return cb(new Error("ادمینی با این آیدی وجود ندارد"), null);
          }
          const fullPath = path.join(__dirname, pathDir);

          if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
          }

          cb(null, fullPath);
        } catch (error) {
          cb(error, null);
        }
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
    fileFilter: imageFormater,
  });
};

module.exports = storageMulter;
