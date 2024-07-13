const fs = require("fs").promises;

const getAllImages = async (pathImages, ImagesFolderName) => {
  try {
    const files = await fs.readdir(pathImages);
    const images = files.filter(
      (file) =>
        file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")
    );

    let allImages = images.map((item) => ({
      image_name: item,
      image_url: `${process.env.HOST}:${process.env.PORT}/images/${ImagesFolderName}/${item}`,
    }));

    return allImages;
  } catch (err) {
    console.error("Error reading directory:", err);
    throw new Error("خطا در خواندن دایرکتوری");
  }
};

module.exports = getAllImages;
