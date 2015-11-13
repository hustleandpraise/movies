

var HomeController      = require('./controllers/index');
var SignupController    = require('./controllers/signup');
var LoginController     = require('./controllers/login');

module.exports = (app) => {
    app.use('/', HomeController);
    app.use('/signup', SignupController);
    app.use('/login', LoginController);
}
