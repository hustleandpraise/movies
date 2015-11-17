
var express     = require('express'),
    router      = express.Router(),
    services    = require('../services'),
    Passport    = require('passport'),
    Fetch       = require('node-fetch'),
    _           = require('lodash');

/*
|--------------------------------------------------------------------------
| New Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    res.render('new/new', { errors: req.flash('error') });
});




router.post('/', (req, res, next) => {

    var title = encodeURIComponent(req.body.title);

    var url = "http://api.themoviedb.org/3/search/movie?api_key=c9dd61be6a740c461bf22c50cc44d1fb&query=" + encodeURIComponent(req.body.title);

    Fetch(url)
        .then(function(result) {
            return result.json();
        }).then(function(json) {

            var filtered = _.filter(json.results, function(movie) {
                return movie.popularity > 0;
            });

            res.render('new/search', { movies: json.results });
            // res.json(json);
        }).catch((err) => {
            res.redirect('/new');
        });

});


/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;



