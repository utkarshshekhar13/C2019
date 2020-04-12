const express = require("express");
const app = express();
const log = require("morgan")("dev");
const bodyParser = require("body-parser");
const router = express.Router();
const passport = require("passport");
const path = require("path");

//importing port number and mongodb url
const properties = require("./config/properties");

//importing mongodb configuration
const database = require("./config/database");

//importing all the api routes here
const publicAuthRoutes = require("./api/publicAuth/publicAuth.routes");
const identityUploadRoutes = require("./api/identityUpload/identityUpload.routes");
const publicLatLongRoutes = require("./api/publicLatLong/publicLatLong.routes");
const roleRoutes = require("./api/role/role.routes");
const questionRoutes = require("./api/question/question.routes");
const optionRoutes = require("./api/option/option.routes");
const answerRoutes = require("./api/answer/answer.routes");
//<!----- @TODO import your new routes javascript file here ------ !>

//To access all the files in the folder using url
app.use("/static", express.static(path.join(__dirname, "./upload")));

//body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure log
app.use(log);

//call the database connectivity function
database();

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

//Configuration of passport jwt strategy for farmer authenticated routes by Primary Key
require("./strategy/jwtStrategy")(passport);

//Error Handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

//use express router
app.use("/api", router);
publicAuthRoutes(router);
identityUploadRoutes(router);
publicLatLongRoutes(router);
roleRoutes(router);
questionRoutes(router);
optionRoutes(router);
answerRoutes(router);

//initialise server
app.listen(properties.PORT, () =>
  console.log(`Server is running on ${properties.PORT} port.`)
);
