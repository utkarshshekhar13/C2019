const mongoose = require("mongoose");
const publicLatLongSchema = require("./publicLatLong.model");

publicLatLongSchema.statics = {
  create: function (data, cb) {
    let latlong = new this(data);
    latlong.save(cb);
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

let publicLatLongModel = mongoose.model("publicLatLong", publicLatLongSchema);
module.exports = publicLatLongModel;
