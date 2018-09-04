exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ideas', function (table) {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.boolean('active');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ideas')
  ]);
};
