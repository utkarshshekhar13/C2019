const Question = require("./question.dao");
const Option = require("../option/option.dao");
const jwt = require("jsonwebtoken");
const Setup = require("../../secret/secret");
const Public = require("../publicAuth/publicAuth.dao");

//Controller for creating question only by admin
exports.createQuestion = (req, res, next) => {
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
          question: req.body.question,
          role: req.body.role,
        };

        Question.create(data, (err, data) => {
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

//Controller for updating question only by admin
exports.updateQuestion = (req, res, next) => {
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
          question: req.body.question,
          role: req.body.role,
        };

        Question.update({ _id: req.params.id }, data, (err, updatecb) => {
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

//Controller for deleting question only by admin
exports.deleteQuestion = (req, res, next) => {
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
        Question.delete({ _id: req.params.id }, (err, deletecb) => {
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

//Controller for retrieving all the question by role publically but authenticated
exports.getQuestionByRole = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    }
    Question.get({ role: req.body.role }, (err, data) => {
      if (err) res.status(400).json({ status: 400, error: err });

      data.forEach((question) => {
        console.log(question._id);

        // Option.get({ qid: question._id }, (err, option) => {
        //   if (err) res.status(400).json({ status: 400, error: err });
        //   res.status(200).json({
        //     status: 200,
        //     question: data,
        //     option: option,
        //   });
        // });
      });

      res.status(200).json({ status: 200, question: data });
    });
  });
};

//Controller for retrieving all the question publically but authenticated
exports.getAllQuestion = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    }
    Question.get({}, (err, data) => {
      if (err) res.status(400).json({ status: 400, error: err });
      res.status(200).json({ status: 200, question: data });
    });
  });
};
