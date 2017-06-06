var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var catData = require('./catData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/style.css', function(req, res) {
  res.render(public + '/style.css')
});

app.get('/index.js', function(req, res) {
  res.render(public + '/index.js')
});

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
