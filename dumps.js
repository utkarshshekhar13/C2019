let token = req.headers.authorization.split(" ")[1];
let verifyToken = jwt.verify(token, Setup.secret, (err, payload) => {
  if (err) {
    res.status(401).json({
      status: 401,
      error: err,
    });
  }

  Public.get({ emailId: payload.emailId }, (err, public) => {
    if (err) {
      res.status(400).json({
        status: 400,
        error: err,
      });
    }

    let role = public[0]["role"];

    if (role == "admin") {
      //<!-- type your admin logic here --!>
      res.status(200).json({ status: 200, data: public });
    } else {
      res.status(401).json({
        status: 401,
        message: "You are not authorized by admin to use this endpoint",
      });
    }
  });
});
