const Answer = require("./answer.dao");
const jwt = require("jsonwebtoken");
const Setup = require("../../secret/secret");
const Public = require("../publicAuth/publicAuth.dao");

//Controller for creating Answer data
exports.createAnswer = (req, res, next) => {
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
        uid: uid,
        qid: req.body.qid,
        option: req.body.option,
      };

      Answer.create(data, (err, data) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }

        res.status(200).json({ status: 200, answer: data });
      });
    });
  });
};

//Controller for updating answer
exports.updateAnswer = (req, res, next) => {
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

      let data = { option: req.body.option };

      Answer.update({ _id: req.params.id }, data, (err, data) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }
        Answer.get({ _id: req.params.id }, (err, data) => {
          if (err) {
            res.status(400).json({
              status: 400,
              error: err,
            });
          }
          res.status(200).json({ status: 200, answer: data });
        });
      });
    });
  });
};

//Controller for retrieving answer based on user id
exports.getEachUserAnswer = (req, res, next) => {
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
      // res.send(uid);
      Answer.get({ uid: uid }, (err, data) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        }
        res.status(200).json({ status: 200, answer: data });
      });
    });
  });
};

//Delete Answer by answer Id
exports.deleteAnswer = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    }

    Answer.delete({ _id: req.params.id }, (err, deletecb) => {
      if (err) res.status(400).json({ status: 400, error: err });
      res.status(200).json({ status: 200, result: deletecb });
    });
  });
};
