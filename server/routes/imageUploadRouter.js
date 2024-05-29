const express = require("express");
const { uploadImages,upload } = require("../controllers/imageUploadController");
const router = express.Router();


// Define the route for multiple image uploads
router.post("/", upload.array("images", 2), uploadImages);

module.exports = router;
