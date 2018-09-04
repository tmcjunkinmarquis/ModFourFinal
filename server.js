const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});



module.exports = app;