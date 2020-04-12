const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Public = require("../api/publicAuth/publicAuth.dao");
const Setup = require("../secret/secret");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req["uploadedFiles"] = [];
    let token = req.headers.authorization.split(" ")[1];
    let verify = jwt.verify(token, Setup.secret, (err, payload) => {
      if (err) {
        res.json({ error: err });
      } else {
        Public.get({ email: payload.email }, (err, public) => {
          if (err) {
            res.json({ error: err });
          } else {
            let id = public[0]["id"];
            let dir = "./upload";
            let subdir = "./upload/" + id;
          
            //Both the folders ROOT + SUB is not present
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
              if (!fs.existsSync(subdir)) fs.mkdirSync(subdir);
            }

            //Sub Folder is not present but ROOT folder is present
            if (!fs.existsSync(subdir)) {
              fs.mkdirSync(subdir);
            }

            let dirname = subdir + "/";
            cb(null, dirname);
          }
        });
      }
    });
  },
  filename: function (req, file, cb) {
    console.log(file.uploadedFiles, "text");
    
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

module.exports = upload;
