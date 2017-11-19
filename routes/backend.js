// var express = require('express');
var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , config            =     require('../config')
  , mysql             =     require('mysql')
  , app               =     express();

  var router = express.Router();

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
  app.listen(3000);



// backup part ----------------------------------------

////////////////////////////////////////////////////////////////////////
// Connect to MySQL
// var mysql = require('mysql');
// config = require("../config");
// db = config.database;
// var connection = mysql.createConnection({
//   host: db.host,
//   user: db.user,
//   password: db.password,
//   database: db.database
// })

// var result = [];
//
//
// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected to the MySQL Database.')
// })
//
// connection.query("SELECT User_ID, Username from User;", function(err, rows, fields) {
//   if (!err) {
//     result = rows;
//     for (var i = 0; i < result.length; i++) {
//       console.log(result[i]);
//       console.log(result[i].User_ID);
//       console.log(result[i].Username);
//     }
//   }
//   else
//     console.log('Error while performing Query.');
// });
//
//
// /* GET users listing. */
router.get('/', function(req, res, next) {
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

<<<<<<< HEAD
module.exports = router;
//
// //Define MySQL parameter in Config.js file.
// var connection = mysql.createConnection({
//   host     : config.host,
//   user     : config.username,
//   password : config.password,
//   database : config.database
// });
// //Connect to Database only if Config.js parameter is set.
// if(config.use_database==='true')
// {
//     connection.connect();
// }
//
// // Passport session setup.
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });
// // Use the FacebookStrategy within Passport.
// passport.use(new FacebookStrategy({
//     clientID: config.facebook_api_key,
//     clientSecret:config.facebook_api_secret ,
//     callbackURL: config.callback_url
//   },
//   function(accessToken, refreshToken, profile, done) {
//     process.nextTick(function () {
//       //Check whether the User exists or not using profile.id
//       //Further DB code.
//       return done(null, profile);
//     });
//   }
// ));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({ secret: 'keyboard cat', key: 'sid'}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(__dirname + '/public'));
// //Router code
// app.get('/', function(req, res){
//   res.render('index', { user: req.user });
// });
// app.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
// });
// //Passport Router
// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//        successRedirect : '/',
//        failureRedirect: '/login'
//   }),
//   function(req, res) {
//     res.redirect('/');
//   });
// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login')
// }
// app.listen(3000);
=======
////////////////////////////////////////////////////////////////////////
// Feed GPS Coordinates
// todo: I may want to move all of this into another file or into
// backend.js

console.log("===================================================");
console.log("GPS Testing");








////////////////////////////////////////////////////////////////////////
// End
module.exports = router;

>>>>>>> master
