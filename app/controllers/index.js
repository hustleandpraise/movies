
var express = require('express'),
    router  = express.Router();

/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/

router.get('/', (req, res, next) => {
    console.log(req.isAuthenticated());
    res.render('index', { title: 'Express Skeleton', author: "@warrenhaskins" });
});



/*
|--------------------------------------------------------------------------
| Export 
|--------------------------------------------------------------------------
*/

module.exports = router;
