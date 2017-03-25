var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

//adds authentication methods in passport library to User
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
