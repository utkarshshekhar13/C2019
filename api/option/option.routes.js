const Option = require("./option.controller");
const passport = require("passport");

module.exports = (router) => {
  //@type     POST
  //@route    /api/createOption
  //@desc     route for Creating Option
  //@access   PRIVATE
  router.post(
    "/createOption",
    passport.authenticate("jwt", { session: false }),
    Option.createOption
  );

  //@type     DELETE
  //@route    /api/deleteOption/passyourquestionidhere
  //@desc     route for Deleting Option
  //@access   PRIVATE
  router.delete(
    "/deleteOption/:id",
    passport.authenticate("jwt", { session: false }),
    Option.deleteOption
  );

  //@type     POST
  //@route    /api/updateOption/passyouridhere
  //@desc     route for Updating Option
  //@access   PRIVATE
  router.put(
    "/updateOption/:id",
    passport.authenticate("jwt", { session: false }),
    Option.updateOption
  );

  //@type     GET
  //@route    /api/getQuestionBasedOption
  //@desc     route for Retrieving All the Option of particular question
  //@access   PRIVATE
  router.get(
    "/getQuestionBasedOption",
    passport.authenticate("jwt", { session: false }),
    Option.getOptionByQuestionId
  );

  //@type     GET
  //@route    /api/getQuestionOption
  //@desc     route for Retrieving All the Option of particular question
  //@access   PRIVATE
  router.get(
    "/getQuestionOption",
    passport.authenticate("jwt", { session: false }),
    Option.getQuestionOption
  );
};
