const mongoose = require("mongoose");
const questionSchema = require("./question.model");

questionSchema.statics = {
  create: function (data, cb) {
    let question = new this(data);
    question.save(cb);
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

let questionSchemaModel = mongoose.model("Question", questionSchema);
module.exports = questionSchemaModel;
