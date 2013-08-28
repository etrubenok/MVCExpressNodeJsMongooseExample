/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 28.08.13
 * Time: 21:09
 * To change this template use File | Settings | File Templates.
 */

var dbUrl = 'mongodb://mongodb.localhost/test';
var db = require('mongoose').connect(dbUrl);

exports.db = db;