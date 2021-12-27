var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Sign in', messege: 'Please sign in.', category: 'contact'});
});

module.exports = router;
