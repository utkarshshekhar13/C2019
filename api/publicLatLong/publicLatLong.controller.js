const jwt = require("jsonwebtoken");
const Setup = require("../../secret/secret");
const PublicLatLong = require("./publicLatLong.dao");
const Public = require("../publicAuth/publicAuth.dao");

//controller for creating lat long value
exports.createPublicLatLong = (req, res, next) => {
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

      let data = {
        uid: public[0]["_id"],
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };

      PublicLatLong.create(data, (err, publicLatLong) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }

        res.status(200).json({ status: 200, geoData: publicLatLong });
      });
    });
  });
};

//controller for updating lat long value
exports.updatePublicLatLong = (req, res, next) => {
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
      let data = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };

      PublicLatLong.update({ uid: uid }, data, (err, updatedData) => {
        if (err) res.json({ error: err });
        res.status(200).json({ status: 200, geoData: updatedData });
      });
    });
  });
};

//controller for retrieving lat long value
exports.getLatLong = (req, res, next) => {
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
      PublicLatLong.getById({ uid: uid }, (err, data) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }

        res.status(200).json({ status: 200, data: data });
      });
    });
  });
};
