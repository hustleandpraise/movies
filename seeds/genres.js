Fetch = require('node-fetch');

var url = "http://api.themoviedb.org/3/genre/movie/list?api_key=c9dd61be6a740c461bf22c50cc44d1fb";

exports.seed = function(knex, Promise) {

    return Fetch(url)
        .then(function(result) {
            return result.json();
        }).then(function(json) {
            var arr = [knex('genres').del()];
            json.genres.forEach((genre) => {
                arr.push( knex('genres').insert({ id: genre.id, title: genre.name, created_at: new Date(), updated_at: new Date() }) );
            });
            return new Promise.all(arr)
        });

};
