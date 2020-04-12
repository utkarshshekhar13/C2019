const Identity = require("./identityUpload.dao");
const jwt = require("jsonwebtoken");
const Setup = require("../../secret/secret");
const Public = require("../publicAuth/publicAuth.dao");
const fs = require("fs");
const path = require("path");

//Controller for uploading the file and maping the file name to the database with userId
exports.createFolder = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    }

    Public.get({ emailId: payload.emailId }, (err, public) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }

      let uploadData = {
        uid: public[0]["_id"],
        idType: req.body.idType,
        idPicFileName: req.body.idPicFileName,
        profilePicFileName: req.body.profilePicFileName,
        profileVideoFileName: req.body.profileVideoFileName,
      };

      Identity.create(uploadData, function (err, data) {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }

        res.status(200).json({ status: 200, identityData: data });
      });
    });
  });
};

//Controller for updating the file and mapping the file name to the database with user id
exports.updateFolder = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    }

    Public.get({ emailId: payload.emailId }, (err, public) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }

      let uid = public[0]["_id"];

      let uploadData = {
        uid: uid,
        idType: req.body.idType,
        idPicFileName: req.body.idPicFileName,
        profilePicFileName: req.body.profilePicFileName,
        profileVideoFileName: req.body.profileVideoFileName,
      };

      Identity.update({ uid: uid }, uploadData, (err, uploadcb) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }

        res.status(200).json({ status: 200, data: uploadcb });
      });
    });
  });
};

//Controller for retrieving uploaded data
exports.retrieveFolder = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    }

    Public.get({ emailId: payload.emailId }, (err, public) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }

      let uid = public[0]["_id"];
      let data = [];
      let directoryPath = "./upload/" + uid;
      fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }

        files.forEach(function (file) {
          // let reqPath = "http://localhost:3000/static/";
          let reqPath = "http://3.22.88.214:3000/static/";
          var fullpath = reqPath + uid + "/";
          let completePath = fullpath + file;
          data.push(completePath);
        });
        res.status(200).json({ status: 200, data: data });
      });
    });
  });
};
