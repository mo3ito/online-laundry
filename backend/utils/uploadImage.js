const fs = require("fs");
const storageMulter = require("./storageMulter");

const uploadImage = (path, model, imageKey) => {
  return async (req, res, next) => {
    try {
      // بررسی و ایجاد مسیر اگر وجود ندارد
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      const upload = storageMulter(path, model, imageKey);

      upload.single(imageKey)(req, res, (err) => {
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