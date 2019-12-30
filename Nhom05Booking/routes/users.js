var express = require('express');
var passport = require('passport');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.get('/sign-up', userController.signup);


router.get('/sign-in', userController.signin);
router.post('/sign-in', passport.authenticate('local', {
    failureRedirect: '/sign-in',
  }), async function (req, res) {
    res.redirect('/');
  });

router.get('/profile', userController.profile);
module.exports = router;
