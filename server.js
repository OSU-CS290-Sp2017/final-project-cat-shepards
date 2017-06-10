var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

// var catData = require('./catData');
var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST || "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER || "cs290_janzeng";
var mongoPassword = process.env.MONGO_PASSWORD || "youshallnotpass";
var mongoDBName = process.env.MONGO_DB || "cs290_janzeng";
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
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

  var index = req.body.index;

  var collection = mongoDB.collection('cats');
  collection.find( {}).toArray(function (err, catData) {
    if (err) {
      console.log("Error fetching cat from database.")
      res.status(500).send("fail");
    } else {
      var catArray = collection.find({cats: {$slice:[index,1]}});
      // var cat = catData[index];
      console.log(catArray);
      // catArray.updateOne( {inc: {votes: 1}});


      res.send([3]);
    }
  })


  // var newCatData = catData;
  // newCatData[req.body.index].votes++;
  // var vote = newCatData[req.body.index].votes;
  // fs.writeFile('catData.json', JSON.stringify(newCatData), function(err){
  //   if (err){
  //     res.status(500).send("Unable to write to file.");
  //   } else{
  //     res.send([vote]);
  //   }
  // });
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
