const mongoose = require("mongoose");
const publicSchema = require("./publicAuth.model");

//we define all the function by the use of mongoose.statics.
//Statics are pretty much the same as methods but allow for defining functions that exist directly on your Model.
publicSchema.statics = {
  create: function (data, cb) {
    let public = new this(data);
    public.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByName: function (query, cb) {
    this.find(query, cb);
  },

  getByEmail: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.updateOne(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.deleteOne(query, cb);
  },
};

var publicModel = mongoose.model("PublicAuth", publicSchema);
module.exports = publicModel;
