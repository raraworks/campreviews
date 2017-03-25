var mongoose = require("mongoose");
var Campground = require ("./models/campground");
var Comment = require("./models/comment");
var data = [
  {
    name:"Clouds Rest",
    image:"http://defd230db96761500ca7-61c6d5aeae250d28854ed3e240a16b15.r17.cf3.rackcdn.com/Products/47380-190116165002301331578.jpg",
    description:"Bacon ipsum dolor amet picanha biltong fatback turducken porchetta jerky. Cupim andouille fatback meatloaf landjaeger beef ribs filet mignon. Meatball flank filet mignon, prosciutto bresaola alcatra salami pork belly. Strip steak filet mignon porchetta beef ribs jerky frankfurter. Cow pork cupim filet mignon short ribs. Boudin biltong meatball ham hock andouille rump bacon alcatra pork loin chicken. Meatball pork loin cow tri-tip kevin pastrami fatback jowl pig pork chop. Bacon ipsum dolor amet picanha biltong fatback turducken porchetta jerky. Cupim andouille fatback meatloaf landjaeger beef ribs filet mignon. Meatball flank filet mignon, prosciutto bresaola alcatra salami pork belly. Strip steak filet mignon porchetta beef ribs jerky frankfurter. Cow pork cupim filet mignon short ribs. Boudin biltong meatball ham hock andouille rump bacon alcatra pork loin chicken. Meatball pork loin cow tri-tip kevin pastrami fatback jowl pig pork chop."
  },
  {
    name: "Desert",
    image: "https://images-na.ssl-images-amazon.com/images/I/81LmkUY3lLL._SL1500_.jpg",
    description: "Bacon ipsum dolor amet picanha biltong fatback turducken porchetta jerky. Cupim andouille fatback meatloaf landjaeger beef ribs filet mignon. Meatball flank filet mignon, prosciutto bresaola alcatra salami pork belly. Strip steak filet mignon porchetta beef ribs jerky frankfurter. Cow pork cupim filet mignon short ribs. Boudin biltong meatball ham hock andouille rump bacon alcatra pork loin chicken. Meatball pork loin cow tri-tip kevin pastrami fatback jowl pig pork chop. Bacon ipsum dolor amet picanha biltong fatback turducken porchetta jerky. Cupim andouille fatback meatloaf landjaeger beef ribs filet mignon. Meatball flank filet mignon, prosciutto bresaola alcatra salami pork belly. Strip steak filet mignon porchetta beef ribs jerky frankfurter. Cow pork cupim filet mignon short ribs. Boudin biltong meatball ham hock andouille rump bacon alcatra pork loin chicken. Meatball pork loin cow tri-tip kevin pastrami fatback jowl pig pork chop."
  },
  {
    name: "Queens",
    image:"http://defd230db96761500ca7-61c6d5aeae250d28854ed3e240a16b15.r17.cf3.rackcdn.com/Products/39446-130215135649301331578.jpg",
    description: "Bacon ipsum dolor amet picanha biltong fatback turducken porchetta jerky. Cupim andouille fatback meatloaf landjaeger beef ribs filet mignon. Meatball flank filet mignon, prosciutto bresaola alcatra salami pork belly. Strip steak filet mignon porchetta beef ribs jerky frankfurter. Cow pork cupim filet mignon short ribs. Boudin biltong meatball ham hock andouille rump bacon alcatra pork loin chicken. Meatball pork loin cow tri-tip kevin pastrami fatback jowl pig pork chop. Bacon ipsum dolor amet picanha biltong fatback turducken porchetta jerky. Cupim andouille fatback meatloaf landjaeger beef ribs filet mignon. Meatball flank filet mignon, prosciutto bresaola alcatra salami pork belly. Strip steak filet mignon porchetta beef ribs jerky frankfurter. Cow pork cupim filet mignon short ribs. Boudin biltong meatball ham hock andouille rump bacon alcatra pork loin chicken. Meatball pork loin cow tri-tip kevin pastrami fatback jowl pig pork chop."
  }
];

function seedDb() {
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Removed all campgrounds");
  //  add campgrounds AFTER deleting all
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground) {
        if (err) {
        console.log(err);
        }
        else {
          console.log("Created a campground");
          //Create a comment
          Comment.create({text: "This place is greaat!", author: "Homer"}, function (err, comment) {
            if (err) {
              console.log(err);
            }
            else {
              campground.comments.push(comment);
              campground.save();
              console.log("Created new comment");
            }
          });
        }
      });
    });
  });
}
//funkcija seedDb tiks eksportēta, jo to norāda zemāk esošā rindiņa.
//vērtība tiks piešķirta mainīgajam iekš galvenā faila, kur iekļauts šis fails,
//ar require
module.exports = seedDb;
