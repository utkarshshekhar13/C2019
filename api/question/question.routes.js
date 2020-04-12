const Question = require("./question.controller");
const passport = require("passport");

module.exports = (router) => {
  //@type     POST
  //@route    /api/createQuestion
  //@desc     route for Creating Question
  //@access   PRIVATE
  router.post(
    "/createQuestion",
    passport.authenticate("jwt", { session: false }),
    Question.createQuestion
  );

  //@type     DELETE
  //@route    /api/deleteQuestion/passyourquestionidhere
  //@desc     route for Deleting Question
  //@access   PRIVATE
  router.delete(
    "/deleteQuestion/:id",
    passport.authenticate("jwt", { session: false }),
    Question.deleteQuestion
  );

  //@type     POST
  //@route    /api/updateQuestion/passyouridhere
  //@desc     route for Updating Question
  //@access   PRIVATE
  router.put(
    "/updateQuestion/:id",
    passport.authenticate("jwt", { session: false }),
    Question.updateQuestion
  );

  //@type     GET
  //@route    /api/getAllQuestion
  //@desc     route for Retrieving All the Question
  //@access   PUBLIC
  router.get(
    "/getAllQuestion",
    passport.authenticate("jwt", { session: false }),
    Question.getAllQuestion
  );

  //@type     GET
  //@route    /api/getRoleBasedQuestion
  //@desc     route for Retrieving All the Question
  //@access   PUBLIC
  router.get(
    "/getRoleBasedQuestion",
    passport.authenticate("jwt", { session: false }),
    Question.getQuestionByRole
  );
};
