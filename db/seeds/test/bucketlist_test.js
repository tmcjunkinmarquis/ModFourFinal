exports.seed = function (knex, Promise) {
  return knex('ideas').del()
    .then(() => {
      return Promise.all([
        knex('ideas').insert([
          {
            title: 'First Idea',
            description: 'Best idea ever',
            active: true
          },
          {
            title: 'Second Idea',
            description: 'Second best idea ever',
            active: true
          }
        ], 'id')
      ])
        .catch(error => console.log(`Error seeding data: ${error}`));
    });
};

