const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const { baseUrl } = require("../endpoint");

const getAllImages = async (pathImages, ImagesFolderName) => {
  console.log("pathImages", pathImages);
  try {
    const files = await fs.readdir(`${pathImages}/${ImagesFolderName}`);
    const images = files.filter(
      (file) =>
        file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")
    );

    let allImages = images.map((item) => ({
      _id: uuidv4(),
      image_name: item,
      image_url: `${baseUrl}/images/${ImagesFolderName}/${item}`,
    }));

    console.log("allImages", allImages);

    return allImages;
  } catch (err) {
    console.error("Error reading directory:", err);
    throw new Error("خطا در خواندن دایرکتوری");
  }
};

module.exports = getAllImages;
