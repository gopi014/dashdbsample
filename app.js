var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var superuser=require('./routes/superuser'); 
// create a new express server
var app = express();
// START OF CHANGE
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('X-HTTP-Method-Override'));


app.use('/',superuser); 

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
      res.status(200).end();
  } else {
      next();
  }
});


app.set('port', process.env.PORT || 8080);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Cognipay Server listening on port ' + app.get('port'));
});


module.exports = app;