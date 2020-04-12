const Answer = require("./answer.controller");
const passport = require("passport");

module.exports = (router) => {
  //@type     POST
  //@route    /api/addAnswer
  //@desc     route for add Answer Details by User
  //@access   PRIVATE
  router.post(
    "/addAnswer",
    passport.authenticate("jwt", { session: false }),
    Answer.createAnswer
  );

  //@type     PUT
  //@route    /api/updateAnswer/:id
  //@desc     route for updating Answer
  //@access   PRIVATE
  router.put(
    "/updateAnswer/:id",
    passport.authenticate("jwt", { session: false }),
    Answer.updateAnswer
  );

  //@type     GET
  //@route    /api/getAnswer
  //@desc     route for retrieving Answer by uid
  //@access   PRIVATE
  router.get(
    "/getAnswer",
    passport.authenticate("jwt", { session: false }),
    Answer.getEachUserAnswer
  );

  //@type     DELETE
  //@route    /api/deleteAnswer/pass_your_answer_id_here
  //@desc     route for deleting Answer by answer _id
  //@access   PRIVATE
  router.delete(
    "/deleteAnswer/:id",
    passport.authenticate("jwt", { session: false }),
    Answer.deleteAnswer
  );
};
