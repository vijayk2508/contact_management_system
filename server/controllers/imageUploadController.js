const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to validate file type
const fileFilter = (req, file, cb) => {
  // const allowedTypes = /jpeg|jpg|png|gif/;
  // const mimetype = allowedTypes.test(file.mimetype);
  // const extname = allowedTypes.test(
  //   path.extname(file.originalname).toLowerCase()
  // );
  // if (mimetype && extname) {
  //   return cb(null, true);
  // } else {
  //   cb(
  //     "Error: File upload only supports the following filetypes - " +
  //       allowedTypes
  //   );
  // }
};

// Initialize multer with the storage configuration and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

// Controller function to handle multiple file upload

const uploadImages = async (req, res) => {
  if (!req.body.images || req.body.images.length === 0) {
    return {
      success: false,
      message: "No files uploaded or file type not supported.",
    };
  }

  const uploadFolder = path.join(__dirname, "uploads", Date.now().toString());
  fs.mkdir(uploadFolder, { recursive: true });

  const imageUrls = [];

  const baseURL = "https://contact-management-system-5aky.onrender.com";

  try {
    await Promise.all(
      req.body.images.map(async (img, index) => {
        let base64Image = img.split(";base64,").pop();
        const imagePath = path.join(uploadFolder, `image_${index + 1}.png`);
        await fs.writeFile(imagePath, base64Image, { encoding: "base64" }); // Use fs.promises.writeFile and await its completion
        console.log("File created");
        const imageUrl = `${baseURL}/${path.relative(__dirname, imagePath)}`;

        imageUrls.push(imageUrl.replace(/\\/g, "/"));
      })
    );

    return { success: true, imageUrls };
  } catch (error) {
    console.error("Error saving images:", error);
    return { success: false, message: "Internal server error" };
  }
};

module.exports = { uploadImages };

module.exports = {
  upload,
  uploadImages,
};
