var User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// To create user
router.post('/', function (req,res, next) {
  var response = {};
  var userInfo = req.body;
   var newUser = new User(userInfo);
   newUser.save(function (err,user) {
       if(err)  {
         response.error = err;
       }
       else{
         response.status = "User created";
       }
       res.send(response);
   });
});

module.exports = router;
