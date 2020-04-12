const Option = require("./option.dao");
const Question = require("../question/question.dao");
const jwt = require("jsonwebtoken");
const Setup = require("../../secret/secret");
const Public = require("../publicAuth/publicAuth.dao");

//Controller for creating option for particular question only by admin
exports.createOption = (req, res, next) => {
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
          qid: req.body.qid,
          option: req.body.option,
        };

        Option.create(data, (err, data) => {
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

//Controller for updating option only by admin
exports.updateOption = (req, res, next) => {
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
          qid: req.body.qid,
          option: req.body.option,
        };
        Option.update({ _id: req.params.id }, data, (err, updatecb) => {
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

//Controller for deleting option only by admin
exports.deleteOption = (req, res, next) => {
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
        Option.delete({ _id: req.params.id }, (err, deletecb) => {
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

//Controller for retrieving all the option based upon questionid but authenticated
exports.getOptionByQuestionId = (req, res, next) => {
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
        Option.get({ qid: req.body.qid }, (err, data) => {
          if (err) res.status(400).json({ status: 400, error: err });
          res.status(200).json({ status: 200, question: data });
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
exports.getQuestionOption = (req, res, next) => {
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
      let id = [];

      data.forEach((value) => {
        id.push(value._id);
      });

      Option.get({ qid: { $in: id } }, (err, option) => {
        if (err) res.status(400).json({ status: 400, error: err });
        let finalObject = [];
        data.forEach((ele) => {
          let temp = {
            _id: ele._id,
            question: ele.question,
            role: ele.role,
            option: [],
          };

          temp.option = option.filter(
            (element) => element.qid.toString() == ele._id.toString()
          );

          finalObject.push(temp);
        });
        res.status(200).json({
          status: 200,
          question: finalObject,
        });
      });
    });
  });
};
