// Server

////////////////////////////////////////////////////////////////////////
// Modules
var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , config            =     require('../config')
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
if(config.use_database==='true')
{
  connection.connect();
}

////////////////////////////////////////////////////////////////////////
// Passport


// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
  clientID: config.facebook_api_key,
  clientSecret:config.facebook_api_secret ,
      callbackURL: config.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        //Further DB code.
        return done(null, profile);
      });
    }
  ));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'keyboard cat',  resave: true, saveUninitialized: true, key: 'sid'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/public'));
  //Router code
  app.get('/', function(req, res){
    res.render('index', { user: req.user });
  });
  app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });
  //Passport Router
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
         successRedirect : '/',
         failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/');
    });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
  //app.listen(3000);












////////////////////////////////////////////////////////////////////////
// Post Requests


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



console.log("===================================================");
console.log("GPS Testing");

app.post('/coordinates', function(req,res) {

  console.log("Running query...");

  var longitude = req.longitude;
  var latitude = req.latitude;

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