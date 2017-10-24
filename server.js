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

// Set connect to MySQL
// Must move database credentials to db.cfg file and place in .gitignore file
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

var users = require('./routes/users');
app.use('/users', users);
/*

app.use('/', require('./routes/index')); // configure our routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

////////////////////////////////////////////////////////////////////////
// Start Application

// startup at localhost:5000
app.listen(port);
console.log('Server running on port 3001...');

module.exports = app;