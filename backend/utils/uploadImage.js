const storageMulter = require("./storageMulter");

const uploadImage = (path, model, folderName) => {
  return async (req, res, next) => {
    try {
      const upload = storageMulter(path, model, folderName);

      upload.single(folderName)(req, res, (err) => {
        if (err) {
          return next(err);
        }

        if (req.fileValidationError) {
          return res.status(400).send(req.fileValidationError);
        }

        const filename = req.file.filename;
        res.json({
          message: "عکس با موفقیت آپلود شد",
          filename: filename,
        });
      });
    } catch (error) {
      console.error("خطا:", error);
      next(error);
    }
  };
};

module.exports = uploadImage;