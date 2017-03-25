var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var flash = require("connect-flash");

// Check if current user is logged in
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You have to login first!");
    res.redirect("/login");
};

// Check if campground exists and if current user is the author of resource
middlewareObj.checkUser = function(req, res, next){
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundResult){
      if (err) {
        req.flash("error", "There is no campground with this ID!");
        res.redirect("/campgrounds");
      }
      else {
        //neizmantojam === jo viens foundResult.author.id ir mongo objekts, bet req.user._id ir string
        //taadel izmanto equals
        if (foundResult.author.id.equals(req.user._id)) {
          next();
        }
        else {
          req.flash("error", "You are not the author of this campground!");
          res.redirect("/campgrounds/" + req.params.id);
        }
      }
    });
  }
  else {
    req.flash("error", "You have to login first!");
    res.redirect("/login");
  }
};

middlewareObj.checkUserComm = function(req, res, next){
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundResult){
      if (err) {
        req.flash("error", "There is no comment with this ID!");
        res.redirect("/campgrounds/" + req.params.id);
      }
      else {
        //neizmantojam === jo viens foundResult.author.id ir mongo objekts, bet req.user._id ir string
        //taadel izmanto equals
        if (foundResult.author.id.equals(req.user._id)) {
          next();
        }
        else {
          req.flash("error", "You are not the author of this comment!");
          res.redirect("/campgrounds/"+req.params.id);
        }
      }
    });
  }
  else {
    req.flash("error", "You have to login first!");
    res.redirect("/login");
  }
};
module.exports = middlewareObj;
