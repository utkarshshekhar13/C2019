const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let publicLatLongSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "PublicAuth",
    },
    latitude: {
      type: String,
      unique: false,
      required: false,
    },
    longitude: {
      type: String,
      unique: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = publicLatLongSchema;
