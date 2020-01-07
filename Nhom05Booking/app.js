var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHandlebars = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var connectFlash = require('connect-flash');
var expressSession = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var handlebars = require('handlebars');
var app = express();
var request = require('request');
//mongoose.connect('mongodb://localhost/booking');

require('./configs/handlebar');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  expressHandlebars({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/layouts/partials',
    defaultLayout: 'layout'
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  //login or logout
  //res.locals.isAuthenticated= req.isAuthenticated();
  res.locals.user = req.session.user;
  // res.locals.listrooms = 'xin chao';
  //session cart
  // res.locals.session = req.session;
  res.locals.listRooms = req.session.listRooms;
  res.locals.room = req.session.room;
  res.locals.reservation = req.session.reservation;
  res.locals.roomlistbooked = req.session.roomlistbooked;
  next();
});

app.get('/logout', function(req, res) {
  res.locals.user = null;
  req.session.user = null;
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
