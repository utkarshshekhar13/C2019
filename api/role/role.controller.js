const Role = require("./role.dao");
const jwt = require("jsonwebtoken");
const Setup = require("../../secret/secret");
const Public = require("../publicAuth/publicAuth.dao");

//Controller for creating role only by admin
exports.createRole = (req, res, next) => {
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

      let role = public[0]["role"];

      if (role == "admin") {
        let data = {
          role: req.body.role,
        };

        Role.create(data, (err, data) => {
          if (err) {
            res.status(400).json({
              status: 400,
              error: err,
            });
          }
          res.status(200).json({ status: 200, role: data });
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "You are not authorized by admin to use this endpoint",
        });
      }
    });
  });
};

//Controller for updating role only by admin
exports.updateRole = (req, res, next) => {
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
      let role = public[0]["role"];

      if (role == "admin") {
        let data = {
          role: req.body.role,
        };

        Role.update({ _id: req.params.id }, data, (err, updatecb) => {
          if (err) {
            res.status(400).json({
              status: 400,
              error: err,
            });
          }
          res.status(200).json({ status: 200, message: updatecb });
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "You are not authorized by admin to use this endpoint",
        });
      }
    });
  });
};

//Controller for deleting role only by admin
exports.deleteRole = (req, res, next) => {
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
      let role = public[0]["role"];

      if (role == "admin") {
        Role.delete({ _id: req.params.id }, (err, deletecb) => {
          if (err) {
            res.status(400).json({
              status: 400,
              error: err,
            });
          }
          res.status(200).json({ status: 200, message: deletecb });
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "You are not authorized by admin to use this endpoint",
        });
      }
    });
  });
};

//Controller for retrieving all the role publically
exports.getRole = (req, res, next) => {
  Role.get({}, (err, data) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: err,
      });
    }
    res.status(200).json({ status: 200, role: data });
  });
};
