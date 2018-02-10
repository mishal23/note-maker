var mongoose = require("mongoose");

var connectDB = function (callback, fallback) {
    mongoose.connect("mongodb://notemaker:makernote@ds229388.mlab.com:29388/notemaker");

    var db = mongoose.connection;
    db.on('error',function (error) {
       fallback(error);
    });
    db.once('open',function (obj) {
        console.log("Connection to mlabs successful");
        callback(obj);
    });
};

exports.connectDB = connectDB;