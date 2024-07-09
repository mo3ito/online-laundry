
const fs = require('fs').promises;
const path = require('path');


const deleteFiles = async (directoryPath, fileName) => {
  try {
    const files = await fs.readdir(directoryPath);
    const imageFiles = files.filter(file => file.startsWith(fileName));
    
    for (const file of imageFiles) {
      const imagePath = path.join(directoryPath, file);
      await fs.unlink(imagePath);
    }
  } catch (err) {
    console.error("Failed to delete image:", err);
    throw new Error("خطایی رخ داد در حذف تصویر");
  }
};

module.exports = deleteFiles