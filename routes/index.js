var express = require('express');
var router = express.Router();
var user=require('./users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { users: user.usernm.username, profileimage:user.usernm.profileimage });
  console.log(user.usernm.profileimage);
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'members' });
});

module.exports = router;
