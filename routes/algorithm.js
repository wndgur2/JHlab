var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('algorithm', {category: "algorithm"});
});

module.exports = router;
