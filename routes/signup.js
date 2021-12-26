var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up', messege: 'Welcome to Reptopia.', category: "contact"});
});

module.exports = router;
