var roomController = require('../models/room');


module.exports.home =function(req, res, next) {
    res.render('homes/home', { title: 'N5-BOOKING' })
};

module.exports.room=function(req, res, next) {
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