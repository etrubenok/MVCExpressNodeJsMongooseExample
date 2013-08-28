/**
 * Created with JetBrains WebStorm.
 * User: etrubenok
 * Date: 8/23/13
 * Time: 9:55 PM
 * To change this template use File | Settings | File Templates.
 */

var async = require('async');

var Kitten = require('../data/models/kitten');
var loadKitten = require('./middleware/load_kitten');

var maxKittensPerPage = 5;

module.exports = function(app) {

    app.get('/kittens', function(req, res, next) {
        var page = req.query.page && parseInt(req.query.page, 10) || 0;

        async.parallel([

                function(next) {
                    Kitten.count(next);
                },

                function(next) {
                    Kitten.find({})
                        .sort({'name': 1})
                        .skip(page * maxKittensPerPage)
                        .limit(maxKittensPerPage)
                        .exec(next);
                }
            ],

            function(err, results) {
                if ( err ) {
                    return next(err);
                }

                var count = results[0];
                var kittens = results[1];

                var lastPage = (page + 1) * maxKittensPerPage >= count;

                res.render('kittens/index', {
                    title: 'Kittens',
                    kittens: kittens,
                    page: page,
                    lastPage: lastPage
                });

            });
    });

    app.get('/kittens/new', function(req, res) {
        res.render('kittens/new', {title: 'New kitten'});
    });

    app.get('/kittens/:id', loadKitten, function(req, res, next) {
        res.render('kittens/profile', {title: 'Kitten profile', kitten: req.kitten, page: req.query.page});
    });

    app.post('/kittens', function(req, res, next) {
        Kitten.findOne({name: req.body.name}, function(err, kitten) {
            if (err) {
                return next(err);
            }
            if ( kitten ) {
                return res.send('Conflict', 409);
            }
            Kitten.create(req.body, function(err) {
                if ( err ) {
                    return next(err);
                }
                res.redirect('/kittens');
            });
        });
    });
}