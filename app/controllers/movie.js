
var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/:movie', (req, res, next) => {
    var movie = new models.Movie({ url: req.params.movie }).fetch({ withRelated: ['genres', 'user'] });

    movie.then((model) => {
        console.log(model)
        res.render('movie/index', { movie: model.toJSON(), user: model.relations.user.toJSON(), genres: model.relations.genres.toJSON() });
    });

   
});

/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
