
var express     = require('express'),
    router      = express.Router(),
    services    = require('../services'),
    models      = require('../models');
    Passport    = require('passport'),
    Fetch       = require('node-fetch'),
    _           = require('lodash'),
    http        = require("http");

function url(id) {
    return "http://api.themoviedb.org/3/movie/" + id + "?api_key=c9dd61be6a740c461bf22c50cc44d1fb";
}

function poster(img) {
    return "http://image.tmdb.org/t/p/w500" + img;
}

/*
|--------------------------------------------------------------------------
| New Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    res.render('new/new', { errors: req.flash('error') });
});


router.post('/', (req, res, next) => {

    var getMovie = Fetch(url(req.body.movieid));

    getMovie.then(function(result) {
        return result.json();
    }).then(function(json) {

        var genres = json.genres.map((item) => {
            return item.id;
        });

        var movie = new models.Movie({
            user_id:        req.user.id,
            imdb_id:        json.imdb_id,
            title:          json.title,
            description:    json.overview,
            runtime:        json.runtime,
            release_date:   json.release_date,
            budget:         json.budget,
            poster:         poster(json.poster_path)
        });

        movie.save().then((model) => {

            model.genres().attach(genres).then((genres) => {
                req.flash('message', 'YAY!')
                res.redirect('/' + model.get('url'));
            });

        }).catch((err) => {
            console.log(err);
            res.render('new/new', { errors: err, fields: req.body });
        });

    });

});


/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;



