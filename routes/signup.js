var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up', messege: 'Fill the form below.', category: "contact"});
});

module.exports = router;
