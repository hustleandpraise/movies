
var express = require('express'),
    router  = express.Router(),
    models  = require('../models');

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {

    var movie = new models.Movie().orderBy('title', 'ASC').fetchAll();

    movie.then((models) => {
        console.log(models)
        res.render('index', { movies: models.toJSON() });
    });

});



/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
