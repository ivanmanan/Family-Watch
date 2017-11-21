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
const fs = require('fs');
const https = require('https');
const path = require('path');

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

// Set to HTTPS for GPS sharing
const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'police.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'police.key'))
}


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


app.post('/coordinates', (req,res) => {

  console.log("Running query...");

  const param = req.body;
  const longitude = param.longitude;
  const latitude = param.latitude;

  // todo:
  // Need to replace query with '1' to respective user ID

  if (longitude === 0 && latitude === 0) {
    console.log("Setting up GPS...\n")
  }
  else {
    console.log("Inserting into database:")
    console.log("Longitude: " + longitude);
    console.log("Latitude: " + latitude + "\n");
    connection.query('INSERT INTO GPS (hid, Longitude, Latitude) VALUES ("'
                     + 1 + '", "' + longitude + '", "' + latitude + '");');
  }

  res.end("Success!");
});





////////////////////////////////////////////////////////////////////////
// Start Application

// Server at localhost:3001
// React client running at localhost:3000

// Switch to HTTPS
https.createServer(httpsOptions, app)
  .listen(port, function() {
    console.log('Server running on port ' + port + ' via HTTPS...');
  })

// Note: In order for HTTPS to run, you must disable security on google chrome:
// $ chromium-browser --disable-web-security --user-data-dir
// On https://localhost:3000, click on 'Advanced' to override the
// "Connection is not private"

//app.listen(port);

module.exports = app;
