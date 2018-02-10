var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
   username: {type: String , required: true, unique: true},
    password: {type: String, required:true},
    email: {type: String, required: true, unique: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,"Not a valid email address"]}

});

var User = mongoose.model('User',userSchema);

module.exports = User;