

var HomeController      = require('./controllers/index');
var SignupController    = require('./controllers/signup');
var LoginController     = require('./controllers/login');
var NewController     = require('./controllers/new');
var MovieController     = require('./controllers/movie');

function ensureAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user.toJSON()
        next()
    } else {
        req.flash('error', 'You must be logged in to do that.')
        res.redirect('/login')
    }
}

module.exports = (app) => {

    app.use('/', HomeController);
    app.use('/signup', SignupController);
    app.use('/login', LoginController);

    app.all('/new**', ensureAuthenticated);
    app.use('/new', NewController);

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.use('/', MovieController);

}
