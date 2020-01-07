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

router.get('/manager-room', indexController.managerRoom);

router.get('/manager-bill', indexController.managerBill);


router.get('/edit-room', indexController.editRoom);
router.get('/getEditRoom',indexController.getEditRoom);

router.get('/addRoom',indexController.addRoom);

module.exports = router;
