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

// Define MySQL parameter in Config.js file.
db = config.database;
var connection = mysql.createConnection({
  host     : db.host,
  user     : db.user,
  password : db.password,
  database : db.database
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to the MySQL Database.')
})










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

app.post('/coordinates', (req,res) => {

  console.log("Running query...");

  const param = req.body;
  console.log("Inserting into database:")
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  console.log("Longitude: " + longitude);
  console.log("Latitude: " + latitude + "\n");

  // var data = req.body;
  // var longitude = req.body.longitude;
  // var latitude = req.body.latitude;
  // console.log(req.body);
  // The '1' number will be replaced with the respective user id's


  connection.query('INSERT INTO GPS (hid, Longitude, Latitude) VALUES ("'
                   + 1 + '", "' + longitude + '", "' + latitude + '");');

  res.end("Success!");
});





////////////////////////////////////////////////////////////////////////
// Start Application

// Server at localhost:3001
// React client running at localhost:3000
app.listen(port);
console.log('Server running on port 3001...');

module.exports = app;
