let express = require('express');
let router = express.Router();
let models = require('../../models/index');

router.post('/', function(req, res, next) {
  models.savePayload(req.body, (collectorKey) => {
        res.json({
        "data":
          [
            {
              "type": collectorKey.kind,
              "id": collectorKey.id
            }
        ],
        "jsonapi": {
          "version": "1.0.0"
        }
      })
    }, (errors) => {
      res.json({ errors });
  })
})

module.exports = router;
