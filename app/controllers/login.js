
var express     = require('express'),
    router      = express.Router(),
    services    = require('../services');

/*
|--------------------------------------------------------------------------
| Login Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    res.render('login', { errors: req.flash('error') });
});

router.post('/',
    services.passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true 
    })
);

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;





