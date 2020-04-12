const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let uploadPublicFileSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "PublicAuth",
      unique: true,
      required: false,
      dropDups: true,
    },
    idType: {
      type: String,
      unique: false,
      required: false,
    },
    idPicFileName: {
      type: String,
      unique: false,
      required: false,
    },
    profilePicFileName: {
      type: String,
      unique: false,
      required: false,
    },
    profileVideoFileName: {
      type: String,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = uploadPublicFileSchema;
