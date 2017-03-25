var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (req, res) {
  //find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if (err) {
      console.log(err);
    }
    else {
      res.render("comments/new", {campground: campground});
    }
  });
});
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
  //lookup campground using id
  //create new comments
  //connect new comment to campground
  //redirect to campground show page
  Campground.findById(req.params.id, function(err, result){
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      //zem body.comment ir abi input lauki, jo input lauku NAME parametros norādījām comment[text] un comment[author]
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err);
        }
        else {
          //add username and id to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          result.comments.push(comment);
          result.save();
          req.flash("success", "Comment added!");
          res.redirect("/campgrounds/" + result._id);
        }
      });
    }
  });
});

//EDIT comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkUserComm, function(req,res){
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    }
    else {
      res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
    }
  });
});

//UPDATE comment
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkUserComm, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    }
    else {
      req.flash("success", "Comment edited!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkUserComm, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("/campgrounds" + req.params.id);
    }
    else {
      req.flash("success", "Comment deleted!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;
