var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userModels = mongoose.Schema;

var userModels = new userModels({ 
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    password: {type: String, require: true},
    tel: {type: String, require: true},
    email: {type: String, require: true},
});

userModels.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userModels.methods.comparePassword = function(password, hash){
    return bcrypt.compareSync(password, hash )};

module.exports = mongoose.model("userController", userModels, "userController");
