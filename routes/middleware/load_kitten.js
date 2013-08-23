/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 8/23/13
 * Time: 11:58 PM
 * To change this template use File | Settings | File Templates.
 */

var Kitten = require('../../data/models/kitten');

function loadKitten(req, res, next) {
    Kitten.findOne({_id: req.params.id}, function(err, kitten) {
        if ( err ) {
            return next(err);
        }

        if ( !kitten ) {
            return res.send('Not found', 404);
        }

        req.kitten = kitten;
        next();
    });
}

module.exports = loadKitten;