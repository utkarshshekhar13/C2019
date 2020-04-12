const Role = require("./role.controller");
const passport = require("passport");

module.exports = (router) => {
  //@type     POST
  //@route    /api/createRole
  //@desc     route for Creating Role
  //@access   PRIVATE
  router.post(
    "/createRole",
    passport.authenticate("jwt", { session: false }),
    Role.createRole
  );

  //@type     DELETE
  //@route    /api/deleteRole/passyouridhere
  //@desc     route for Deleting Role
  //@access   PRIVATE
  router.delete(
    "/deleteRole/:id",
    passport.authenticate("jwt", { session: false }),
    Role.deleteRole
  );

  //@type     POST
  //@route    /api/updateRole/passyouridhere
  //@desc     route for Updating Role
  //@access   PRIVATE
  router.put(
    "/updateRole/:id",
    passport.authenticate("jwt", { session: false }),
    Role.updateRole
  );

  //@type     GET
  //@route    /api/getRole
  //@desc     route for Retrieving Role
  //@access   PUBLIC
  router.get("/getRole", Role.getRole);
};
