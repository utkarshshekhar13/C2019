const PublicLatLong = require("./publicLatLong.controller");
const passport = require("passport");

module.exports = (router) => {
  //@type     POST
  //@route    /api/createLatLong
  //@desc     route for inserting latitude longitude data
  //@access   PRIVATE
  router.post(
    "/createLatLong",
    passport.authenticate("jwt", { session: false }),
    PublicLatLong.createPublicLatLong
  );

  //@type     PUT
  //@route    /api/updateLatLong
  //@desc     route for updating latitude longitude data
  //@access   PRIVATE
  router.put(
    "/updateLatLong",
    passport.authenticate("jwt", { session: false }),
    PublicLatLong.updatePublicLatLong
  );

  //@type     GET
  //@route    /api/getLatLong
  //@desc     route for updating latitude longitude data
  //@access   PRIVATE
  router.get(
    "/getLatLong",
    passport.authenticate("jwt", { session: false }),
    PublicLatLong.getLatLong
  );
};
