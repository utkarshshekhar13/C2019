const bcyrpt = require("bcryptjs");
const Public = require("./publicAuth.dao");
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const Setup = require("../../secret/secret");
const refreshTokens = {};

//Controller to create Public
exports.createPublic = function (req, res, next) {
  let password = req.body.password;
  bcyrpt.hash(password, 10, function (err, hash) {
    if (err) return next(err);
    // override the cleartext password with the hashed one
    password = hash;
    let publcFormData = {
      role: req.body.role,
      title: req.body.title,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      language: req.body.language,
      dob: req.body.dob,
      emailId: req.body.emailId,
      password: password,
      mobileNumber: req.body.mobileNumber,
      postalCode: req.body.postalCode,
      houseNumber: req.body.houseNumber,
      personalAddress: {
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
      },
      isMobileNumberVerified: req.body.isMobileNumberVerified,
      isIdentityVerified: false,
    };
    Public.create(publcFormData, function (err, public) {
      if (err) {
        res.status(400).json({
          status: 400,
          error: err,
        });
      }
      res.status(200).json({
        status: 200,
        public: public,
      });
    });
  });
};

//Controller to Retrieve all Public(Users)
exports.getPublic = (req, res, next) => {
  Public.get({}, (err, public) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: err,
      });
    }
    res.json({
      status: 200,
      public: public,
    });
  });
};

//Controller for login
exports.loginPublic = (req, res, next) => {
  let password = req.body.password;
  Public.get({ emailId: req.body.emailId }, (err, public) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: err,
      });
    } else {
      if (bcyrpt.compareSync(password, public[0]["password"]) == true) {
        const payload = {
          role: public[0]["role"],
          emailId: req.body.emailId,
        };

        let token = jwt.sign(payload, Setup.secret, {
          expiresIn: 600 * 600,
        });
        let refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = public._id;

        res.json({
          status: 200,
          success: true,
          token: "Bearer " + token,
          refreshToken: refreshToken,
          payload: payload,
        });
      } else {
        res.status(401).json({ status: 401, message: "Incorrect Password" });
      }
    }
  });
};

//Controller to Retrieve all Public(Users) by id
exports.getPublicById = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    } else {
      Public.get({ _id: req.params.id }, (err, public) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        } else {
          res.status(200).json({ status: 200, public: public });
        }
      });
    }
  });
};

//Update public profile by Id and by verifying jwt token
exports.updatePublic = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 401,
        error: err,
      });
    } else {
      Public.get({ email: payload.email }, (err, public) => {
        if (err) {
          res.status(400).json({
            status: 400,
            error: err,
          });
        } else {
          let password = req.body.password;
          bcyrpt.hash(password, 10, function (err, hash) {
            if (err) return next(err);
            password = hash;

            let publcFormData = {
              title: req.body.title,
              firstName: req.body.firstName,
              middleName: req.body.middleName,
              lastName: req.body.lastName,
              language: req.body.language,
              dob: req.body.dob,
              password: password,
              mobileNumber: req.body.mobileNumber,
              postalCode: req.body.postalCode,
              houseNumber: req.body.houseNumber,
              personalAddress: {
                addressLineOne: req.body.addressLineOne,
                addressLineTwo: req.body.addressLineTwo,
              },
            };
            Public.update(
              { emailId: public[0]["emailId"] },
              publcFormData,
              (err, data) => {
                if (err)
                  res.status(400).json({
                    status: 400,
                    error: err,
                  });
                Public.get({ emailId: public[0]["emailId"] }, (err, public) => {
                  if (err)
                    res.status(400).json({
                      status: 400,
                      error: err,
                    });
                  res.status(200).json({ status: 200, public: public });
                });
              }
            );
          });
        }
      });
    }
  });
};
