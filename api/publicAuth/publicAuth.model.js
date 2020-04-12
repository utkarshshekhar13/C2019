const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let publicSchema = new Schema(
  {
    role: {
      type: String,
      unique: false,
      required: false,
    },
    title: {
      type: String,
      unique: false,
      required: false,
    },
    firstName: {
      type: String,
      unique: false,
      required: false,
    },
    middleName: {
      type: String,
      unique: false,
      required: false,
    },
    lastName: {
      type: String,
      unique: false,
      required: false,
    },
    language: {
      type: String,
      unique: false,
      required: false,
    },
    dob: {
      type: String,
      unique: false,
      required: false,
    },
    emailId: {
      type: String,
      unique: true,
      required: false,
    },
    password: {
      type: String,
      unique: true,
      required: false,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: false,
    },
    postalCode: {
      type: String,
      unique: false,
      required: false,
    },
    houseNumber: {
      type: String,
      unique: false,
      required: false,
    },
    personalAddress: {
      addressLineOne: { type: String, unique: false, required: false },
      addressLineTwo: { type: String, unique: false, required: false },
    },
    isMobileNumberVerified: {
      type: String,
      unique: false,
      required: false,
    },
    isIdentityVerified: {
      type: Boolean,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = publicSchema;
