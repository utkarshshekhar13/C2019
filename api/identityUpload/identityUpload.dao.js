const mongoose = require("mongoose");
const identityUploadSchema = require("./identityUpload.model");

identityUploadSchema.statics = {
  create: function (data, cb) {
    let identity = new this(data);
    identity.save(cb);
  },

  getById: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updatedData, cb) {
    this.updateOne(query, { $set: updatedData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.deleteOne(query, cb);
  },
};

let identityModel = mongoose.model("IdentityUpload", identityUploadSchema);
module.exports = identityModel;
