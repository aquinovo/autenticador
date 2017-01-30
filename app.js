var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engines = require('consolidate');

//Obtener los archivos para las rutas
var routes = require('./routes/index');
var users = require('./routes/users');
var rol= require('./routes/rol');
var service= require('./routes/service');
var aservice= require('./routes/aservice');
var connection = require('./connection');
var mustacheExpress = require('mustache-express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', mustacheExpress());
//app.set('view engine', 'mustache-express');
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');
app.engine('html', engines.hogan);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(body_parser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

connection.init();

//Las rutas para cada CRUD
app.use('/', routes);
app.use('/users', users);
app.use('/rol', rol);
app.use('/service', service);
app.use('/aservice', aservice);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
