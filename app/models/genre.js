var services    = require('../services'),
    checkit     = require('checkit'),
    bcrypt      = require('bcryptjs'),
    Movie       = require('./movie');


var rules = {
    title: ['required']
}

var Genre = services.Bookshelf.Model.extend({
    tableName:  'genres',
    hasTimestamps: ["created_at", "updated_at"],
    initialize: function() {
        // woot!
    },
    movies: function() {
        return this.belongsToMany(Movie);
    }
});

module.exports = Genre;
