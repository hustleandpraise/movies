
exports.up = function(knex, Promise) {
    return knex.schema.createTable('genres_movies', function (table) {
        table.increments().primary();
        table.integer('movie_id').unsigned().references('movies.id');
        table.integer('genre_id').unsigned().references('genres.id');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('genres_movies')
};
