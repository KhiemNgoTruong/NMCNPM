var passport = require('passport');
var getuser = require('../configs/getuser');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs')
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    passReqToCallback: true,
    emailField: 'email', 
    passwordField: 'password',
}, async function (req, email, password, done) {

    //tim user
    //const user  = await User.findOne({ username: username });
    var user = getuser.getuser();
    if (user ) {
       
        return done(null, {
            id: user._id
        });
    }
    req.flash('errorlogin', 'Tên tài khoản của bạn hoặc Mật khẩu không đúng, vui lòng thử lại');
    return done(null, false);   
}));
