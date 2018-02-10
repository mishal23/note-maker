var User = require('../models/user');
var userMiddleWare = function (req,res,next) {
  if(req.cookies.user_id){
      User.findOne({"_id": req.cookies.user_id}, function (err,user) {
         if(err || !user){
             res.send("Log in again");
         }
         else
             next();
      });
  }
  else
      res.send("Please login");
};

module.exports = userMiddleWare ;