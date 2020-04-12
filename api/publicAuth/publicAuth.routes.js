const Public = require("./publicAuth.controller");
const passport = require("passport");

module.exports = (router) => {
  //@type     POST
  //@route    /api/createPublic
  //@desc     route for inserting public data
  //@access   PUBLIC
  router.post("/createPublic", Public.createPublic);

  //@type     GET
  //@route    /api/getPublic
  //@desc     route for retrieving public data for admin use
  //@access   PUBLIC
  router.get("/getPublic", Public.getPublic);

  //@type     GET
  //@route    /api/getPublicById/addIdhereInParams
  //@desc     route for retrieving authenticated public data
  //@access   PRIVATE
  router.get(
    "/getPublicById/:id",
    passport.authenticate("jwt", { session: false }),
    Public.getPublicById
  );

  //@type     POST
  //@route    /api/loginPublic
  //@desc     route for public login
  //@access   PUBLIC
  router.post("/loginPublic", Public.loginPublic);

  //@type     PUT
  //@route    /api/updatePublic
  //@desc     route for updating public profile
  //@access   PRIVATE
  router.put(
    "/updatePublic",
    passport.authenticate("jwt", { session: false }),
    Public.updatePublic
  );
};

//   passport.authenticate("jwt", { failWithError: true }),
