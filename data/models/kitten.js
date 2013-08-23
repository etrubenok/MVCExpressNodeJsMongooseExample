/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 8/23/13
 * Time: 10:25 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var KittenSchema = require('../schemas/kitten');

var Kitten = mongoose.model('Kitten', KittenSchema);

module.exports = Kitten;
