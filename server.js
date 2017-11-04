// Server

////////////////////////////////////////////////////////////////////////
// Modules
const express = require('express');
const app = express();
var cookieParser = require('cookie-parser'); // not sure what this does yet
var bodyParser = require('body-parser'); // pulls information from HTML POST
var favicon = require('serve-favicon'); // obtains favicon from /public/images

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

// Connect to MySQL
var mysql = require('mysql');
config = require("./config");
db = config.database;
var connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to the MySQL Database.')
})

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


////////////////////////////////////////////////////////////////////////
// Launch Server
// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World!');
//   res.end();
// }).listen(5000);