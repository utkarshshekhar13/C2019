const mongoose = require("mongoose"); //mongoose ODM
const chalk = require("chalk"); //require chalk module to give colors to console text
const databaseURL = require("./properties").DB; //require database URL from properties file

let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;

//The below function is exported and imorted by index.js
module.exports = () => {
  mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log(
      connected(`Mongoose default connection is open to ${databaseURL}`)
    );
  });

  mongoose.connection.on("error", (err) => {
    console.log(error(`Mongoose default connection has occured ${err} error`));
  });

  mongoose.connection.on("disconnected", function () {
    console.log(disconnected(`Mongoose default connection is disconnected`));
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
