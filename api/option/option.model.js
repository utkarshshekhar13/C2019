const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let optionschema = new Schema(
  {
    qid: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    option: {
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

module.exports = optionschema;
