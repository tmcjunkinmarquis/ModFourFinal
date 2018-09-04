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
  
  describe('Name of the group', () => {
    
    it('should return all bucketlist ideas', function (done) {
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


});