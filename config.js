var mongoose = require("mongoose");
const user = require('./routes/userschema');
/**Connection */
mongoose.connect("mongodb://localhost:27017/users");
const db =  mongoose.connection;
//check err
db.on("error", () => {
  console.log("err");
});

db.once("open", () => {
  console.log("connected to mongo db");
});


module.exports = db;
