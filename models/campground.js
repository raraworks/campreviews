var mongoose = require("mongoose");
//SCHEMA setup
var campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
    }
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  price: String
});

//Model setup. We use model to use methods in JS like find, create etc
module.exports = mongoose.model("Campground", campgroundSchema);
