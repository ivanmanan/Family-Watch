var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var nametest = "ivan tester";


  res.json([
    {
  	  id: 1,
  	  name: nametest
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