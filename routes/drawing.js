var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('drawing', {category:"drawing"});
});

module.exports = router;
