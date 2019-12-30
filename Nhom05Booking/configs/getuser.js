
var request = require('request');


exports.getuser = function(req, res, next){
    request.post('http://nhom05booking.herokuapp.com/signin', {form: {'email': 'dddddd@gmail.com', 'password': 'dddddd'}}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var x = JSON.parse(body);
    var {user} = JSON.parse(body);
    return user;
})};

