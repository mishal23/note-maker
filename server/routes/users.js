var User = require('../models/user');
var express = require('express');
var userMiddleWare = require('../middlewares/userMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// To create/register a user
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

// For user to login
// Check if user already present with this username, if present compare the password, if same authenticate user
router.post('/:username', function (req, res) {
    
});

module.exports = router;
