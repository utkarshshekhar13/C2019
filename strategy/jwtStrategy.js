const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Setup = require("../secret/secret");
let Public = require("../api/publicAuth/publicAuth.dao");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Setup.secret;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      let expirationDate = new Date(jwtPayload.exp * 1000000);
      if (expirationDate < new Date()) {
        return done(null, false);
      }
      Public.find({ id: jwtPayload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
