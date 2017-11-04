// Server

////////////////////////////////////////////////////////////////////////
// Modules
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

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
// Feed GPS Coordinates
// todo: I may want to move all of this into another file or into
// backend.js

console.log("===================================================");
console.log("GPS Testing");

var GPS = require('gps');
var gps = new GPS;
gps.on('data', function(parsed) {
    console.log(parsed);
});


console.log("End of GPS Testing");
console.log("===================================================");
////////////////////////////////////////////////////////////////////////
// Routes

var backend = require('./routes/backend');
app.use('/backend', backend);


////////////////////////////////////////////////////////////////////////
// Start Application

// Server at localhost:3001
// React client running at localhost:3000
app.listen(port);
console.log('Server running on port 3001...');

module.exports = app;
