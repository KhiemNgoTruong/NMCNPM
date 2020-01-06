var roomController = require('../models/room');
var request = require('request');

module.exports.home = function(req, res, next) {
  if (!req.session.listRooms) {
    request.get('http://nhom05booking.herokuapp.com/room/list', function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var x = JSON.parse(body);
      var { listRooms } = JSON.parse(body);
      req.session.listRooms = listRooms;
      res.locals.listRooms = req.session.listRooms;
      console.log(res.locals.listRooms);
      return res.render('homes/home', { title: 'N5-BOOKING' });
    });
  } else {
    return res.render('homes/home', { title: 'N5-BOOKING' });
  }
};

module.exports.room = function(req, res, next) {
  if (!req.session.listRooms) {
    request.get('http://nhom05booking.herokuapp.com/room/list', function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var x = JSON.parse(body);
      var { listRooms } = JSON.parse(body);
      req.session.listRooms = listRooms;
      res.locals.listRooms = req.session.listRooms;
      console.log(res.locals.listRooms);
      res.render('rooms/room', { title: 'PHÒNG' });
    });
  } else {
    res.render('rooms/room', { title: 'PHÒNG' });
  }
};

module.exports.about = function(req, res, next) {
  res.render('abouts/about', { layout: 'layout.hbs', title: 'THÔNG TIN' });
};

module.exports.contact = function(req, res, next) {
  res.render('contacts/contact', { layout: 'layout.hbs', title: 'LIÊN HỆ' });
};

module.exports.roomPage = function(req, res, next) {
  res.render('rooms/room-page', { layout: 'layout.hbs', title: 'PHÒNG' });
};

module.exports.bookroom = function(req, res, next) {
  res.render('rooms/book-room', { layout: 'layout.hbs', title: 'PHÒNG' });
};

module.exports.searchroompost = function(req, res, next) {
  //data = req.body;
  var query =
    'adults=' +
    req.body.adults +
    '&childs=' +
    req.body.childs +
    '&arrivalDate=' +
    new Date(req.body.arrivalDate).getTime() +
    '&departureDate=' +
    new Date(req.body.departureDate).getTime();
  request.get('http://nhom05booking.herokuapp.com/room/search?' + query, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    var { listRooms } = JSON.parse(body);
    req.session.listRooms = listRooms;
    res.locals.listRooms = req.session.listRooms;
    res.redirect('/room');
  });
};

module.exports.getRoomInfo = function(req, res, next) {
  var query = 'roomId=' + req.query.roomId;
  var y = 'http://nhom05booking.herokuapp.com/room/info?' + query;
  request.get(y, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    var { room } = JSON.parse(body);
    req.session.room = room;
    res.locals.room = req.session.room;
    res.redirect('/room-page');
  });
};

module.exports.createReservation = function(req, res, next) {
  data = req.body;
  let arrivalDate = new Date(req.body.arrivalDate);
  let departureDate = new Date(req.body.departureDate);

  var x;
  var room = req.session.room;
  var token = req.session.token;
  var user = req.session.user;
  if (req.body.isPaid === '0') {
    checkisPaid = 0;
  } else {
    checkisPaid = 1;
  }

  request.post(
    {
      url: 'http://nhom05booking.herokuapp.com/room/book',
      headers: {
        Authorization: 'bearer ' + token
      },
      form: {
        roomId: room._id,
        userId: user.id,
        arrivalDate: arrivalDate.getTime(),
        departureDate: departureDate.getTime(),
        adults: data.adults,
        childs: data.childs,
        cost: room.price,
        isPaid: checkisPaid
      }
    },
    function(error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      x = JSON.parse(body);
      let { errorCount } = JSON.parse(body);
      if (errorCount != null) {
        let messageErrorCheckout = '';
        for (var i = 0; i < parseInt(errorCount); i++) {
          messageErrorCheckout += x.error.room + '. ';
        }
        req.flash('messagecheckout', messageErrorCheckout);
        res.redirect('/check-out');
      } else {
        req.flash('messagecheckout', 'Đã đặt phòng thành công');
        res.redirect('/check-out');
      }
    }
  );
};
module.exports.checkOut = function(req, res, next) {
  res.render('rooms/check-out', { layout: 'layout.hbs', title: 'Check-out', messagecheckout: req.flash('messagecheckout') });
};
