const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('API routes', () => {
  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  describe('GET / api / v1 / ideas', () => {

    it('should return all bucketlist ideas', (done) => {
      chai.request(server)
        .get('/api/v1/ideas')
        .end(function (error, response) {
          response.should.have.status(200);
          response.body.length.should.equal(2);
          done();
        });
    });

    it('should return a 404 for a route that does not exist', done => {
      chai.request(server)
        .get('/sad')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('POST / api / v1 / ideas', () => {
    it('should add a new idea', (done) => {
      chai.request(server)
        .post('/api/v1/ideas')
        .send({title: "One Big Idea", description: "Do the big thing."})
        .end((error, response)=>{
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.an('object');
          done()
        });
    });
    it('should return a 422 for missing item and description', done => {
      chai.request(server)
        .post('/api/v1/ideas')
        .send({ })
        .end((error, response) => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.deep.equal({error: 'Missing title and description'})
          done()
        });
    });
  });


});