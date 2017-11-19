// Server

////////////////////////////////////////////////////////////////////////
// Modules
var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , config            =     require('./config')
  , mysql             =     require('mysql');
const app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
const io = require('socket.io')(); // Socket

////////////////////////////////////////////////////////////////////////
// Configurations

// uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Set view engine to HTML
app.engine('html', require('ejs').renderFile);
app.set('public', __dirname + '/public');
app.set('view engine', 'html');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Set port
var port = process.env.PORT || 3001;


////////////////////////////////////////////////////////////////////////
// MySQL Database

//Define MySQL parameter in Config.js file.
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.username,
  password : config.password,
  database : config.database
});
//Connect to Database only if Config.js parameter is set.
if(config.use_database==='true') {
  connection.connect();
}












////////////////////////////////////////////////////////////////////////
// Post Requests

/*
app.get('/backend', function(req, res, next) {
  res.json([
    {
  	  id: 1,
  	  name: "ivan"
    }, {
  	  id: 2,
  	  name: "lewis"
    },
    {
      id: 3,
      name: "brian"
    },
    {
      id: 4,
      name: "yb"
    }
  ]);
});
*/


console.log("===================================================");
console.log("GPS Testing");

app.post('/coordinates', function(req,res) {
  console.log(req);
  console.log("Running query...");
  var data = req.body;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  console.log(req.body);
  // The '1' number will be replaced with the respective user id's

/*
  connection.query('INSERT INTO GPS (hid, Longitude, Latitude) VALUES ("'
                   + 1 + '", "' + longitude + '", "' + latitude + '");');

  res.end("Success!");
*/
});





////////////////////////////////////////////////////////////////////////
// Start Application

// Server at localhost:3001
// React client running at localhost:3000
app.listen(port);
console.log('Server running on port 3001...');

module.exports = app;
