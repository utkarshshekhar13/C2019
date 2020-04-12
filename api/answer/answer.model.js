const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let answerSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "PublicAuth",
    },
    qid: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      unique: true,
    },
    option: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = answerSchema;
