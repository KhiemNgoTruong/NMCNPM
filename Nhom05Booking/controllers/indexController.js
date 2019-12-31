var roomController = require('../models/room');
var request = require('request');

module.exports.home =function(req, res, next) {
    res.render('homes/home', { title: 'N5-BOOKING' })
};

module.exports.room=function(req, res, next) {

    request.get('http://nhom05booking.herokuapp.com/room/list', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    var {listRooms} = JSON.parse(body);
    req.session.listRooms = listRooms;
    console.log(res.locals.listRooms)
});

    res.render('rooms/room', { title: 'PHÒNG' })
};

module.exports.about =function(req, res, next) {
    res.render('abouts/about', { layout: 'layout.hbs', title: 'THÔNG TIN' })
};

module.exports.contact =function(req, res, next) {
    res.render('contacts/contact', { layout: 'layout.hbs', title: 'LIÊN HỆ' })
};

module.exports.roomPage=function(req, res, next) {
    res.render('rooms/room-page', { layout: 'layout.hbs', title: 'PHÒNG' })
};

module.exports.checkOut=function(req, res, next) {
    res.render('rooms/check-out', { layout: 'layout.hbs', title: 'Check-out' })
};