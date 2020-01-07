var express = require('express');
var passport = require('passport');
var router = express.Router();
var userController = require('../controllers/userController');
var request = require('request');
var isAuth = require('../middleware/is-auth');
/* GET users listing. */
router.get('/sign-up', userController.signup);

router.get('/sign-in', userController.signin);

router.post('/sign-in', userController.signinpost);

router.post('/sign-up', userController.signuppost);

router.get('/profile', isAuth, userController.profile);

router.get('/profile/:id', isAuth, userController.cancelReservation);

router.get('/testcallapi', async (req, res, next) => {
  //var user = await getuser.getuser();
  request.post('http://nhom05booking.herokuapp.com/signin', { form: { email: 'dddddd@gmail.com', password: 'dddddd' } }, function(
    error,
    response,
    body
  ) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    var { user } = JSON.parse(body);
    res.send(); // Print the HTML for the Google homepage.
  });
});

module.exports = router;
