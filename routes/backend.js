var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////////////////////////
// Connect to MySQL
var mysql = require('mysql');
config = require("../config");
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

connection.query('SELECT * from User;', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});



/* GET users listing. */
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

////////////////////////////////////////////////////////////////////////
// Feed GPS Coordinates
// todo: I may want to move all of this into another file or into
// backend.js

console.log("===================================================");
console.log("GPS Testing");








////////////////////////////////////////////////////////////////////////
// End
module.exports = router;

