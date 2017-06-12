var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb');

var catData = require('./catData');
var app = express();
var port = process.env.PORT || 3000;

// var mongoHost = process.env.MONGO_HOST || "classmongo.engr.oregonstate.edu";
// var mongoPort = process.env.MONGO_PORT || 27017;
// var mongoUser = process.env.MONGO_USER || "cs290_janzeng";
// var mongoPassword = process.env.MONGO_PASSWORD || "youshallnotpass";
// var mongoDBName = process.env.MONGO_DB || "cs290_janzeng";
// var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
//   '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoHost = process.env.MONGO_HOST || "ds143151.mlab.com";
var mongoPort = process.env.MONGO_PORT || 43151;
var mongoUser = process.env.MONGO_USER || "cs290_janzeng";
var mongoPassword = process.env.MONGO_PASSWORD || "y0ushallnotpass";
var mongoDBName = process.env.MONGO_DB || "heroku_bp42bgrj";
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
// var mongoURL = "mongodb://cs290_janzeng:y0ushallnotpass@ds143151.mlab.com:43151/heroku_bp42bgrj"
var mongoDB;

console.log('== MongoDB URL:', mongoURL);


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next){

  var collection = mongoDB.collection('cats');
  collection.find({}).toArray(function (err, catData){
    if (err) {
      res.status(500).send("Error fetching cats from db.");
    } else {
      var templateArgs = {
        cat: catData
      };
      // console.log(catData);
      res.render('catPage', templateArgs);
    }

  });

});

app.get('/pawpular', function(req, res, next){

  var templateArgs = {
    cat: catData
  };
  res.render('catPage', templateArgs);

});

app.post('/upvote',function(req, res, next) {

  var dataID = req.body.dataID;
  var collection = mongoDB.collection('cats');
  var id = new MongoClient.ObjectID(dataID);
  collection.update({ _id: id}, { $inc: { votes: 1}}, function(err, result){
    if (err) {
      console.log("Error fetching cat from database.")
      res.status(500).send("fail");
    }
    else {
        res.status(200).send();
    }
  });
});

app.get('*', function(req, res, next){
  res.status(404).render('404Page');
});

MongoClient.connect(mongoURL, function (err, db) {
  if (err) {
    throw err;
  }
  mongoDB = db;
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
// app.listen(port, function() {
//   console.log("Server listening on port", port);
// });
