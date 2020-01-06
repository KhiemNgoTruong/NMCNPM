var userController = require('../models/user');
var request = require('request');

module.exports.signup = function(req, res, next) {
  res.render('accounts/sign-up', { layout: 'layoutAccounts.hbs', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
};

module.exports.signin = function(req, res, next) {
  errors = req.flash('error');
  res.render('accounts/sign-in', { errors: errors, layout: 'layoutAccounts.hbs' });
};

module.exports.profile = async function(req, res, next) {
  if (req.session.user) {
    var token = req.session.token;
    console.log('asdasd 1');
    request.post(
      {
        url: 'http://nhom05booking.herokuapp.com/user/listbook?userId=' + req.session.user.id,
        headers: {
          Authorization: 'bearer ' + token
        }
      },
      async function(error, response, body) {
        console.log('asdasd 2');
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var { list } = JSON.parse(body);
        req.session.reservation = list;
        res.locals.reservation = list;
        var roomlist = [];
        if (list) {
          for (var i = 0; i < list.length; i++) {
            console.log('asdasd 3');
            var query = 'roomId=' + list[i].room;
            var y = 'http://nhom05booking.herokuapp.com/room/info?' + query;
            await request.get(y, function(error, response, body) {
              console.log('asdasd 4');
              console.log('error:', error); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
              var x = JSON.parse(body);
              var { room } = JSON.parse(body);
              roomlist.push(room);
              req.session.roomlistbooked = roomlist;
              res.locals.roomlistbooked = roomlist;

              if (roomlist.length == list.length) {
                for (var j = 0; j < list.length; j++) {
                  req.session.reservation[j].roomname = roomlist[j];
                }
              }
            });
          }

          //return res.redirect('/');
        }

        return res.render('accounts/profile', {
          layout: 'layout.hbs',
          success: req.session.success,
          errors: req.session.errors,
          roomlist: roomlist
        });
      }
    );
  } else res.redirect('/sign-in');
};
// res.render('accounts/profile', { layout:'layout.hbs', success: req.session.success, errors: req.session.errors });
// req.session.errors = null;

//huy phong va thay doi thong tin ca nhan
module.exports.cancelReservation = function(req, res, next) {
  const reservation = req.params.id;
  var token = req.session.token;
  request.post(
    {
      url: 'http://nhom05booking.herokuapp.com/room/cancel',
      headers: {
        Authorization: 'bearer ' + token
      },
      form: { reservationId: reservation }
    },
    function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      x = JSON.parse(body);
      if (x) {
        res.redirect('/profile');
      } else {
        res.redirect('/sign-up');
      }
    }
  );
};

module.exports.signuppost = function(req, res, next) {
  data = req.body;
  var x;
  request.post(
    'http://nhom05booking.herokuapp.com/signup',
    {
      form: {
        phoneNumber: data.phoneNumber,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        password2: data.password2,
        address: data.address
      }
    },
    function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      x = JSON.parse(body);
      if (x.user != null) {
        res.redirect('/');
      } else {
        res.redirect('/sign-up');
      }
    }
  );
};

module.exports.signinpost = function(req, res, next) {
  request.post('http://nhom05booking.herokuapp.com/signin', { form: { email: req.body.email, password: req.body.password } }, function(
    error,
    response,
    body
  ) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    var { user } = JSON.parse(body);
    var { token } = JSON.parse(body);
    req.session.user = user;
    req.session.token = token;
    if (user) {
      res.redirect('/');
    } else {
      res.redirect('/sign-in');
    }
  });
};
