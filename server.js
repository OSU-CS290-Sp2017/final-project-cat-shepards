var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var catData = require('./catData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next){

  var templateArgs = {
    author: catData,
    caption: catData,
    url: catData,
    votes: catData
  };
  res.render('catPage', templateArgs);
});

app.get('/pawpular', function(req, res, next){

  var templateArgs = {
    author: catData,
    caption: catData,
    url: catData,
    votes: catData
  };
  res.render('catPage', templateArgs);

});

app.get('*', function(req, res, next){

  res.status(404).render('404Page');

});

app.listen(port, function() {
  console.log("Server listening on port", port);
});
