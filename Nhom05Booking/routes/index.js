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



module.exports = router;
