var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Connect to Mlabs DB
var mongooseClient = require('./bin/mongoose_client');
mongooseClient.connectDB(function () {
   console.log("Connection to DB successful");
},function (err) {
    console.log("Error connecting");
    console.log(err);
});

// Allow cross-origin resource sharing for GET,POST,DELETE,PUT request
app.use(cors());
app.use(function(req,res,next){
    res.setHeader( "Access-Control-Allow-Origin", req.headers.origin || '*');
    res.setHeader( "Access-Control-Allow-Credentials", 'true');
    res.setHeader( "Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/notes', notes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
