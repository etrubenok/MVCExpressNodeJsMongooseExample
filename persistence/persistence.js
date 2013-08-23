/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 8/23/13
 * Time: 8:32 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');

exports.connect = function() {
    mongoose.connect('mongodb://localhost/test');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', onSuccessfulConnection);
}

onSuccessfulConnection = function() {
    console.log('MongoDB is connected successfully!');

    var Kitten = require('../data/models/kitten');
    var silence = new Kitten({name: 'Silence', colour: 10});

    console.log(silence.name);

    silence.save(function (err, silence) {
        if ( err ) {
            console.log("Error");
        } else {
            console.log("Saved successfully! " + silence.id);
        }
    });
}



