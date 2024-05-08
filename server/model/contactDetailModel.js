const mongoose = require("mongoose");

const contactDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the phone number is exactly 10 digits
        return /^\d{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number. It must have exactly 10 digits!`,
    },
  },
  phone_number_prefix: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Check if the phone number prefix starts with '+' and ends with a number
        // Also, enforce minimum and maximum lengths
        return /^\+\d+$/.test(v) && v.length >= 1 && v.length <= 3;
      },
      message: (props) =>
        `${props.value} is not a valid phone number prefix. It must start with '+' and end with a number, and be between 1 and 2 characters long!`,
    },
  },
  phone_number_with_prefix: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactDetailModel =
  mongoose.models?.ContactDetailModel ??
  mongoose.model("ContactDetail", contactDetailSchema);

module.exports = ContactDetailModel;
