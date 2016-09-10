let faker    = require('faker');
let chai     = require('chai');
let chaiHttp = require('chai-http');
let app      = require('../../app');
let expect   = chai.expect;

chai.use(chaiHttp);

describe('POST create /', function() {
  describe('when a valid selector is provided', function() {
    it('returns a valid selector data', function() {
      var url     = `${faker.internet.url()}/`;
      return chai.request(app)
        .post('/api/v1/selectors')
        .field('hostname', 'www.lumens.com')
        .send({
          url: url
        })
        .then(function(response) {
          console.log(response)
          expect(response).to.be.status(201);
          expect(response.body.code).to.not.be.null;
        }).catch(function(error) {
        });;
    });
  });
});
