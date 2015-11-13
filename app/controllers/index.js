
var express = require('express'),
    router  = express.Router();

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express Skeleton', author: "@warrenhaskins" });
});



/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
