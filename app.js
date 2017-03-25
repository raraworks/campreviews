var express     = require("express"),
    request     = require("request"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    flash       = require("connect-flash"),
    Campground  = require("./models/campground"),
    User        = require("./models/user"),
    Comment     = require("./models/comment"),
    seedDb      = require("./seeds"),
    methodOverride = require("method-override"),
    app         = express(),
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//connect to db yelp_camp if doesnt exist itll create one
mongoose.connect("mongodb://localhost/yelp_camp");
//set view engine, aka templating engine
app.set("view engine", "ejs");
//use bodyparser library to parse form data
app.use(bodyParser.urlencoded({extended: true}));
//set publicly accessible files on server
app.use(express.static(__dirname + "/public"));
//use method override lib to fully utilize PUT and DELETE requests
app.use(methodOverride("_method"));
//flash zinojumu pakotnes inicializacija
app.use(flash());

//passport config
app.use(require("express-session")({
  secret: "raraworks, best",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware, kas izpildās uz katru route, template padodot info par tekoso lietotaju
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//celu modularizacija
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);
//ja visi celi ieks faila iesakas vienadi, var darit sadi:
//app.use("/campgrounds", campgroundRoutes);
//tad campgroundroutes faila, pie get un post nav jaliek campgrounds, pietiek ar nakoso limeni (piem. /:id)

//palaiz serveri kurs klausas uz noteikto portu
app.listen(3000, function () {
  console.log("Server is Up");
});
