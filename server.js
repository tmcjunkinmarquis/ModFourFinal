const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Mod4 Final';

app.get('/', (request, response) => {
  response.send('It isssss a final!!');
});


app.get('/api/v1/ideas', (request, response) => {
  database('ideas').select()
    .then((ideas) => {
      response.status(200).json(ideas);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/ideas', (request, response) => {
  const idea = request.body;
  if (!idea.title && !idea.description) {
    response.status(422).send({error: 'Missing title and description'});
  } else {
    database('ideas').insert(idea, ['id', 'title', 'description'])

      .then((ideas) => {
        response.status(201).json(ideas[0]);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  }
});

app.delete('/api/v1/ideas/:id', (request, response) => {
  const { id } = request.params;

  database('ideas')
    .where('id', id)
    .del()
    .then(deletedCount => {
      if (deletedCount > 0) {
        response.status(200).json({ Success: `Idea ${id} deleted.` });
      } else {
        response.status(404).json({ Error: `Idea ${id} was not found.` });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });

});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});



module.exports = app;