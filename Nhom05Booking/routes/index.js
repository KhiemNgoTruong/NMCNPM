var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var isAuth = require('../middleware/is-auth');
/* GET home page. */
router.get('/', indexController.home);

router.get('/room', indexController.room);

router.get('/about', indexController.about);

router.get('/contact', indexController.contact);

router.get('/room-page', indexController.roomPage);

router.get('/check-out', isAuth, indexController.checkOut);

router.post('/check-out', isAuth, indexController.createReservation);

router.get('/book-room', isAuth, indexController.bookroom);

router.post('/room', indexController.searchroompost);

router.get('/getroominfo', indexController.getRoomInfo);

router.get('/manager-room', isAuth, indexController.managerRoom);

router.get('/manager-bill', isAuth, indexController.managerBill);

router.get('/edit-room', isAuth, indexController.editRoom);
router.get('/getEditRoom', isAuth, indexController.getEditRoom);

router.get('/addRoom', isAuth, indexController.addRoom);

module.exports = router;
