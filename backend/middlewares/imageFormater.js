
const imageFormater = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/jpeg") ||
    file.mimetype.startsWith("image/jpg") ||
    file.mimetype.startsWith("image/png")
  ) {
    return cb(null, true);
  } else {
    return cb(
      new Error("فقط تصاویر با فرمت‌های jpg ، jpeg و png اجازه بارگذاری دارند")
    );
  }
};

module.exports = imageFormater;
