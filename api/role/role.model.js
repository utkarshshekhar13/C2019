const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let roleSchema = new Schema(
  {
    role: {
      type: String,
      unique: true,
      required: false,
      dropDups: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = roleSchema;
