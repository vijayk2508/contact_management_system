const express = require("express");
const contactDetailRouter = require("./contactDetailRouter");
const imageUploadRouter = require("./imageUploadRouter");
const edenAIAPIRouter = require("./edenAIAPIRouter")

const router = express.Router();

router.use("/contactDetail", contactDetailRouter);
router.use("/uploadImage", imageUploadRouter);
router.use("/edenAIAPI", edenAIAPIRouter);


module.exports = router;
