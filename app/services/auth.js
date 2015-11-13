
var passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        return done(null, false, { message: 'Incorrect username.' });
    }
));

var passport = module.exports = passport;
