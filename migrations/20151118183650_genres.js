
exports.up = function(knex, Promise) {
    return knex.schema.createTable('genres', function (table) {
        table.increments().primary();
        table.string('title');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('genres')
};
