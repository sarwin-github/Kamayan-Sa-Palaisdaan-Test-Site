var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

//include routes
var index = require('./routes/index');
var menu = require('./routes/menu');


var mongoConnectionLocal  = 'mongodb://localhost:27017/AuctionDB';
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionLocal, (error, database) => { if(error) { console.log(error); }});

var app = express();

app.set('port', process.env.PORT || 3003);
// view engine setup
app.set('view engine', 'ejs');
app.set('images', __dirname + '/public/images');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts/', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));
app.use('/fonts/', express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use('/css/', express.static(__dirname + '/node_modules/font-awesome/css'));

app.use('/menu', menu);
app.use('/', index);

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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});