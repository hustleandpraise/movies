
exports.up = function(knex, Promise) {
    return knex.schema.createTable('movies', function (table) {
        table.increments();
        table.integer('user_id');
        table.string('imdb_id');
        table.string('title');
        table.text('description');
        table.integer('runtime');
        table.date('release_date');
        table.integer('budget');
        table.string('poster');
        table.string('url');
        table.string('colour');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('movies')
};
