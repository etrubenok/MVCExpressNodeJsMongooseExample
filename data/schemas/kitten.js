/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 8/23/13
 * Time: 10:21 PM
 * To change this template use File | Settings | File Templates.
 */

var Schema = require('mongoose').Schema;

var KittenScheme = new Schema({
    name: String,
    colour: Number
});

module.exports = KittenScheme;