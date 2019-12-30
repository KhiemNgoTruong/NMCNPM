var userController = require('../models/user');

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