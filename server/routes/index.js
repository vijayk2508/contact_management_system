const express = require("express");
const contactDetailRouter = require("./contactDetailRouter");
const router = express.Router();


router.use("/contactDetail", contactDetailRouter);

module.exports = router;
