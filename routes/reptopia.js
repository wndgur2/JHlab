var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('reptopia', {category: "reptopia"});
});

module.exports = router;
