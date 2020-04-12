const mongoose = require("mongoose");
const answerSchema = require("./answer.model");

answerSchema.statics = {
  create: function (data, cb) {
    let answer = new this(data);
    answer.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updatedData, cb) {
    this.updateOne(query, { $set: updatedData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.deleteOne(query, cb);
  },
};

let answerSchemaModel = mongoose.model("Answer", answerSchema);
module.exports = answerSchemaModel;
