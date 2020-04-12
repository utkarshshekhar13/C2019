const Identity = require("./identityUpload.controller");
const passport = require("passport");
const upload = require("../../config/multerConfig");

module.exports = (router) => {
  //@type     POST
  //@route    /api/uploadIdentity
  //@desc     route for upload Identity Info
  //@access   PRIVATE
  router.post(
    "/uploadIdentity",
    passport.authenticate("jwt", { session: false }),
    upload.array("profiles", 3),
    Identity.createFolder
  );

  //@type     PUT
  //@route    /api/uploadIdentity
  //@desc     route for upload Identity Info
  //@access   PRIVATE
  router.put(
    "/updateIdentity",
    passport.authenticate("jwt", { session: false }),
    upload.array("profiles", 3),
    Identity.updateFolder
  );

  //@type     GET
  //@route    /api/retrieveIdentity
  //@desc     route for retrieve Identity info
  //@access   PRIVATE
  router.get(
    "/retrieveIdentity",
    passport.authenticate("jwt", { session: false }),
    Identity.retrieveFolder
  );
};
