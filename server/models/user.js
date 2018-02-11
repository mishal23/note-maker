var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
   username: {type: String , required: true, unique: true},
    password: {type: String, required:true},
    email: {type: String, required: true, unique: true}

});

var User = mongoose.model('User',userSchema);

module.exports = User;