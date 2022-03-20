var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  var files = fs.readdirSync('./public/images/instagram/');
  res.render('drawing', {category:"drawing", files: files});
});

module.exports = router;
