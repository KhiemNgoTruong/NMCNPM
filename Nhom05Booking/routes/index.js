var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
/* GET home page. */
router.get('/', indexController.home);

router.get('/room', indexController.room);

router.get('/about', indexController.about);

router.get('/contact', indexController.contact);

router.get('/room-page', indexController.roomPage);

router.get('/check-out', indexController.checkOut);

router.post('/check-out', indexController.createReservation);

router.get('/book-room', indexController.bookroom);

router.post('/room', indexController.searchroompost);

router.get('/getroominfo',indexController.getRoomInfo);

module.exports = router;
