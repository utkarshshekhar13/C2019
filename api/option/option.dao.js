const mongoose = require("mongoose");
const optionSchema = require("./option.model");

optionSchema.statics = {
  create: function (data, cb) {
    let option = new this(data);
    option.save(cb);
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

let optionSchemaModel = mongoose.model("Option", optionSchema);
module.exports = optionSchemaModel;
