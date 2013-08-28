/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 28.08.13
 * Time: 19:47
 * To change this template use File | Settings | File Templates.
 */
var Schema = require('mongoose').Schema;
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var UserScheme = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    enabled: {type: Boolean, default: true}
});

// Password verification
UserScheme.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

// Bcrypt middleware
UserScheme.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = UserScheme;