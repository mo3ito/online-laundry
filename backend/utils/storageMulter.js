const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const imageFormater = require("../middlewares/imageFormater");

const checkAndCreateDir = async (fullPath) => {
  try {
    await fs.access(fullPath);
  } catch (err) {
    await fs.mkdir(fullPath, { recursive: true });
  }
};

const storageMulter = (pathDir, model, additionalFolderName) => {
  return multer({
    storage: multer.diskStorage({
      destination: async (req, file, cb) => {
        try {
          const isAdmin = await model.findById(req.headers.authorization);
          if (!isAdmin) {
            return cb(new Error("ادمینی با این آیدی وجود ندارد"), null);
          }
          const fullPath = path.resolve(pathDir);

          await checkAndCreateDir(fullPath);

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
