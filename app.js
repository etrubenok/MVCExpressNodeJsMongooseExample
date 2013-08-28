
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var passport = require('passport');

var db = require('./config/db');
var auth = require('./config/auth');


var app = express();

// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.auth = {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    };
    //res.locals.production = isProduction();
    next();
});

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var users = require('./routes/users')(app);
var kittens = require('./routes/kittens')(app);

var routes = require('./routes');
app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
