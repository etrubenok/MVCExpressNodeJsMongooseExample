/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 28.08.13
 * Time: 19:49
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var User = mongoose.model('User', UserSchema);

module.exports = User;
