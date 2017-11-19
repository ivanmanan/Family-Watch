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

var result = [];


connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to the MySQL Database.')
})

connection.query("SELECT User_ID, Username from User;", function(err, rows, fields) {
  if (!err) {
    result = rows;
    for (var i = 0; i < result.length; i++) {
      console.log(result[i]);
      console.log(result[i].User_ID);
      console.log(result[i].Username);
    }
  }
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

module.exports = router;
