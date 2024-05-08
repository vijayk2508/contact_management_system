const express = require("express");
const {
  createContactDetail,
  updateContactDetail,
  getAllContactDetails,
  deleteContactDetail,
} = require("../controllers/contactDetailControllers");

const {
  createContactDetailValidation,
  updateContactDetailValidation,
  getAllContactDetailValidation,
  deleteContactDetailValidation,
} = require("../middleware/joi-validation/contactDetailValidation");
const contactDetailRouter = express.Router();

//create
contactDetailRouter.post(
  "/create",
  createContactDetailValidation,
  createContactDetail
);

//update
contactDetailRouter.put(
  "/update/:id",
  updateContactDetailValidation,
  updateContactDetail
);

//get
contactDetailRouter.get(
  "/getAllContactDetails",
  getAllContactDetailValidation,
  getAllContactDetails
);

//delete
contactDetailRouter.delete(
  "/delete/:id",
  deleteContactDetailValidation,
  deleteContactDetail
);

module.exports = contactDetailRouter;
