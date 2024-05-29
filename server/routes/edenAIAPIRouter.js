const express = require("express");
const router = express.Router();
const {
  uploadImages,
  upload,
} = require("../controllers/imageUploadController");

router.post("/face_comparison", upload.array("images", 2), async (req, res) => {
  const result = await uploadImages(req, res);
  if (result.success) {
    console.log(result.imageUrls);
    console.log("hihih");
  } else {
    console.error(result.message);
    // Handle error response here
  }
});

module.exports = router;
