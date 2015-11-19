var services    = require('../services'),
    checkit     = require('checkit'),
    User        = require('./user'),
    Genre       = require('./genre'),
    Slug        = require('slug'),
    request     = require('request').defaults({ encoding: null }),
    ColorThief  = require('color-thief'),
    Thief       = new ColorThief(),
    onecolor    = require('onecolor'),
    request     = require('request'),
    Canvas      = require('canvas'),
    Moment      = require('moment');


var rules = {
    imdb_id: ['movie_exists']
}

var Movie = services.Bookshelf.Model.extend({
    tableName:  'movies',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
        this.on('saving', this.validateSave, this);
        this.on('saving', this.setSlug, this);
        // this.on('saving', this.setColor, this);
        this.on('saving', this.setDate, this);
        this.on('fetched', this.formatDate, this);
    },
    validateSave: function() {
        return checkit(rules).run(this.attributes);
    },
    setSlug: function(model) {
        return model.set('url', Slug(model.get('title'), { lower: true }));
    },
    setColor: function(model) {
        return new Promise((resolve, reject) => {

            // request(model.get('poster'), function (err, res, body) {
            //     if(err) return reject(err);
            //     console.log(res.statusCode)
            //     var rgb = Thief.getColor(body);
            //     var rgbCode = 'rgb( ' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            //     var hex = onecolor(rgbCode).hex();
            //     resolve(model.set('colour', hex));
            // });

            var req = http.get(model.get('poster'), function(res){

                if (res.statusCode !== 200) console.log(res);

                var str;

                res.on('data', function (chunk) {
                    str += chunk;
                });

                res.on('end', function () {
                    // resolve(str);
                    // console.log(str);
                    var data = new Buffer(str);

                    var rgb = Thief.getColor(data);
                    var rgbCode = 'rgb( ' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    var hex = onecolor(rgbCode).hex();
                    resolve(model.set('colour', hex));
                });

                res.on("error", function(err){
                    reject(err);
                });

            });

        });
    },
    setDate: function(model) {
        return model.set('release_date', new Date(model.get('release_date')));
    },
    user: function() {
        return this.belongsTo(User);
    },
    genres: function() {
        return this.belongsToMany(Genre);
    },
    orderBy: function (column, order) {
        return this.query(function (qb) {
            qb.orderBy(column, order);
        });
    },
    formatDate: function() {
        return Moment(this.get('release_date')).format('YYYY');
    },
    toJSON: function() {
        var attrs = services.Bookshelf.Model.prototype.toJSON.apply(this, arguments);
        attrs.release_date = this.formatDate();
        return attrs;
    }
});

checkit.Validator.prototype.movie_exists = function(val) {
    return new Movie({ imdb_id : val }).fetch().then(function(model) {
        if (model) throw new Error('The Movie already exists in our database');
    }).catch((err) => {
        throw new Error(err);
    });
}

module.exports = Movie;
