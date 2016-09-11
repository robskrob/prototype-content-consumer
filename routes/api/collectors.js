var express = require('express');
var router = express.Router();
var gcloud = require('gcloud');

var datastore = gcloud.datastore({
  projectId: 'prototype-content-consumer',
  keyFilename: './credentials/private-key.json'
});

/* fields => {
               productname: chair,
               hostname: www.ikea.com,
               pageurl: http://www.ikea.com/us/en/catalog/products/S89100143/,
               ...
             }
*/

function saveCollector(fields) {
  let collectorKey = datastore.key('Collector');
  datastore.save({
    key: collectorKey,
    data: fields
  }, function (err) {
    if (err) {
      return res.json({errors: req});
    }
  });
}

function getCollectorByPageurl(pageurl, cb) {
  let query = datastore.createQuery('Collector').filter('pageurl', pageurl);;
  datastore.runQuery(query, function (err, collector) {
    if (!err && !!collector[0]) {
      cb(undefined, collector[0].data)
    }
     else {
       cb(true, false)
     }
  });
}


/* POST /api/v1/collectors
   body: {
    hostname=www.ikea.com,
    productname=sweater,
    pageurl=http://www.ikea.com/us/en/catalog/products/S89100143/
 }
*/

router.post('/', function(req, res, next) {
  saveCollector(req.body)
  if (req.body) {
    res.json({
      "data": req.body,
      "jsonapi": {
        "version": "1.0.0"
      }
    });
  } else {
    res.json(
      {
        errors:
        [
          {
            detail: 'Could not create collector because of empty request body',
            source: {"pointer": "api/v1/collectors"},
            status: 403
          }
        ]
      }
    );
  }
})

module.exports = router;
