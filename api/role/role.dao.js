const mongoose = require("mongoose");
const roleSchema = require("./role.model");

roleSchema.statics = {
  create: function (data, cb) {
    let role = new this(data);
    role.save(cb);
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

let roleSchemaModel = mongoose.model("Role", roleSchema);
module.exports = roleSchemaModel;
