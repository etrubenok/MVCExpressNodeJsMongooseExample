
/*
 * User routes
 */

var passport = require('passport');

module.exports = function(app) {

    app.get('/signup', function(req, res){
        res.render('users/signup', { user: req.user, message: req.session.messages });
    });

    app.post('/signup', function(req, res, next){
        if (req.body.password != req.body.confirmedPassword ) {
            req.session.messages = ['The passwords should be the same'];
            return res.redirect('/signup');
        }
        var User = require('../data/models/user');
        User.create({email: req.body.email, password: req.body.password}, function(err, user) {
            if ( err ) {
                if (err.code === 11000) {
                    req.session.messages = ['This email has already been registered'];
                    res.redirect("/signup");
                } else {
                    next(err);
                }
                return;
            }
            req.session.messages = ['The user has been successfully registered. Thank you!'];
            res.redirect("/login");
        });
    });

    app.get('/login', function(req, res){
        res.render('users/login', { user: req.user, message: req.session.messages });
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) {
                req.session.messages =  [info.message];
                return res.redirect('/login')
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/');
            });
        })(req, res, next);
    });
}