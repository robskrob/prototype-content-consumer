let express = require('express');
let bodyParser = require('body-parser')
let Entity = require('../../models/entity');

let router = express.Router();
let jsonParser = bodyParser.json()

router.post('/', jsonParser, function(req, res, next) {
  Entity.findSupplier(req.body.host)
    .then((supplier) => {
      return Entity.saveSupplierSample(supplier[0], req.body)
    })
    .then((sample) => {
      res.json(Entity.serializeJsonSample(sample));
    })
    .catch((errors) => {
      res.status(400);
      res.json(errors);
    })
});

module.exports = router;
