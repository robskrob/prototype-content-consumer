var express = require('express');
var router = express.Router();
var gcloud = require('gcloud');

var datastore = gcloud.datastore({
  projectId: 'prototype-content-consumer',
  keyFilename: './credentials/private-key.json'
});

/* fields => { productname: chair, hostname: www.ikea.com, ...} */
function saveSelector(fields) {
  let selectorKey = datastore.key('Selector');
  // TODO: created at / updated at fields
  datastore.save({
    key: selectorKey,
    data: fields
  }, function (err) {
    if (err) {
      return res.json({errors: req});
    }
  });
}

function getSelectorByHostname(hostname, callback) {
  let query = datastore.createQuery('Selector').filter('hostname', hostname);;
  datastore.runQuery(query, function (err, selector) {
    if (!err) {
      callback(undefined, selector[0].data)
    }
  });
}


/* POST /api/v1/selectors
   body: {
    hostname=www.macys.com,
    productname=sweater,
 }
*/

router.post('/', function(req, res, next) {
  saveSelector(req.body)
  res.json({
    "data": req.body,
    "jsonapi": {
      "version": "1.0.0"
    }
  });
})


/* GET /api/v1/selectors/:hostname */
router.get('/:hostname', function(req, res, next) {
  getSelectorByHostname(req.params.hostname, function(err, selectorData) {
    if (!err) {
      res.json({
        "data": selectorData,
        "jsonapi": {
          "version": "1.0.0"
        }
      });
    } else  {
      res.json(
        {
          errors:
          [
            {
              detail: 'Could not find sellector',
              source: {"pointer": "api/v1/sellectors"},
              status: 404
            }
          ]
        }
      );
    }
  });
})

module.exports = router;
