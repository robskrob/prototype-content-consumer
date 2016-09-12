let express = require('express');
let router = express.Router();
let datastore = require('../../models/datastore');
let Serialize = require('../../models/serialize')

router.post('/', function(req, res, next) {
  datastore.saveSample(null, req.body, (sample) => {
    res.json(Serialize.sample(sample));
  }, (errors) => {
    res.status(400);
    res.json(errors);
  });
});

module.exports = router;
