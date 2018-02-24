var User = require('../models/user');
var express = require('express');
var userMiddleWare = require('../middlewares/userMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find(function(err, users) {
     if(err)
         res.send(err);
     else
         res.json(users);

  });
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
    var username = req.params.username;
    var password = req.body.password;
    var response = {};

    response.statusText = "";
    User.findOne({username:username},function(err,user){
      if(err){
        response.statusText = err;
        res.send(response);
      }
      else{
        if(user){
          if(user.password == password){
            response.statusText = "Success";
            response.user_id = user._id;
            // res.cookie(name, value)  = sets cookie "name" to "value"
            /*res.cookie('user_id',user._id,{
              expire: new Date() + 7*86400    //for a day
            }).send(response);*/
            res.send(response);
          }
          else{
            response.statusText = "Invalid Password";
            res.send(response);
          }
        }
        else{
          response.statusText = "Invalid username";
          res.send(response);
        }
      }
    });
});

module.exports = router;
