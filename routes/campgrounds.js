var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var flash = require("connect-flash");

// Get all campgrounds from DB
router.get("/campgrounds", function (req, res) {
  Campground.find({}, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/index", {campgrounds: result});
    }
  });
  // res.render("campgrounds", {campgrounds: campgrounds})
});

//CREATE route. Add a campground route
router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  //saglabā objektā, jo campgrounds array ir ar objektiem
  var newCampground = {name: name, image: image, description: description, author: author, price: price};
  // campgrounds.push(newCampground);
  // Create a new campground and save to DB
  Campground.create(newCampground, function (err, result) {
    if (err) {
      console.log(err);
    }
    else {
      req.flash("success", "Campground added!");
      res.redirect("/campgrounds");
    }
  });
});

//SHOW - shows more info about a campground
router.get("/campgrounds/:id", function (req, res) {
  //find the campground with provided id, populējam Campgroundu ar komentāriem, jo defaultā nav ir tikai komentāra id
  Campground.findById(req.params.id).populate("comments").exec(function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/show", {campground: result});
    }
  });  //render show template with that campground
});

//EDIT route
router.get("/campgrounds/:id/edit", middleware.checkUser, function (req, res){
  Campground.findById(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      res.render("campgrounds/edit", {campground: result});
    }
  });
});

//UPDATE ROUTE
router.put("/campgrounds/:id", middleware.checkUser, function (req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, result) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      req.flash("success", "Campground edited!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//DESTROY route
router.delete("/campgrounds/:id", middleware.checkUser, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    }
    else {
      req.flash("success", "Campground deleted!");
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
