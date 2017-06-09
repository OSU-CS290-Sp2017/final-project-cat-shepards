var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('express-favicon');
var bodyParser = require('body-parser');

var catData = require('./catData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'photos', 'favicon.ico')));


app.get('/', function(req, res, next){

  var templateArgs = {
    cat: catData
  };
  res.render('catPage', templateArgs);
});

app.get('/pawpular', function(req, res, next){

  var templateArgs = {
    cat: catData
  };
  res.render('catPage', templateArgs);

});

app.post('/upvote',function(req, res, next) {
  var newCatData = catData;
  newCatData[req.body.index].votes++;

  // console.log(newCatData[req.body.index].votes);
  fs.writeFile('catData.json', JSON.stringify(newCatData), function(err){
    if (err){
      res.status(500).send("Unable to write to file.");
    }
  });
  res.status(200).send("newCatData[req.body.index].votes");
});

app.get('*', function(req, res, next){
  res.status(404).render('404Page');
});

app.listen(port, function() {
  console.log("Server listening on port", port);
});
