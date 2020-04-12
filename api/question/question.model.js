const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let questionSchema = new Schema(
  {
    question: {
      type: String,
      unique: false,
      required: false,
      dropDups: false,
    },
    role: {
      type: String,
      unique: false,
      required: false,
      dropDups: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = questionSchema;
