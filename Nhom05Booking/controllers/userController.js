var userController = require('../models/user');
var request = require('request');

module.exports.signup= function(req, res, next) {
    res.render('accounts/sign-up', { layout:'layoutAccounts.hbs', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
};

module.exports.signin = function(req, res, next) {
    errors = req.flash('error');
    res.render('accounts/sign-in', {errors: errors, layout: 'layoutAccounts.hbs'});

};

module.exports.profile= function(req, res, next) {
    res.render('accounts/profile', { layout:'layout.hbs', success: req.session.success, errors: req.session.errors });
    req.session.errors = null;
};

module.exports.signuppost = function(req, res, next){
    data = req.body;
    var x;
   request.post('http://nhom05booking.herokuapp.com/signup', {form: { 'phoneNumber':data.phoneNumber ,'email':  data.email, 'firstName': data.firstName, 'lastName' :data.lastName, 'password': data.password, 'password2' : data.password2, 'address':data.address}}, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
     x= JSON.parse(body);   
     if(x.user != null){
        res.redirect('/')
    }else{
        res.redirect('/sign-up');
    }
    });
    
    
};