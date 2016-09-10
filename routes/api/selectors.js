var express = require('express');
var router = express.Router();
var gcloud = require('gcloud');

var datastore = gcloud.datastore({
  projectId: 'prototype-content-consumer',
  keyFilename: './credentials/prototype-content-consumer-fb8666071546.json'
});

/* POST /api/v1/selectors */
router.post('/', function(req, res, next) {
  let selectorKey = datastore.key('Selector');
  datastore.save({
    key: selectorKey,
    data: req.body
  }, function (err) {
    if (err) {
      return res.json({errors: req});
    }
  });


  res.json({
    "data": req.body,
    "jsonapi": {
      "version": "1.0.0"
    }
  });
})

/* GET /api/v1/selectors/:hostname */
router.get('/:hostname', function(req, res, next) {
  let data;
  let query = datastore.createQuery('Selector').filter('hostname', req.params.hostname);;
  datastore.runQuery(query, function (err, selector) {
    if (!err) {
      res.json({
        "data": selector[0].data,
        "jsonapi": {
          "version": "1.0.0"
        }
      });
    }
  });
})


/* GET /api/v1/selectors */
router.get('/', function(req, res, next) {
  let data;

  if (req.query.host === 'jobs.lever.co') {
    data = {
      "logo": ".main-header-logo img",
      "title": ".posting-headline h2",
      "categories": ".posting-categories .posting-category",
      "responsibilities": "h3:contains('Responsibilities') + .posting-requirements li"
    };
  } else if (req.query.host === 'www.spotify.com') {
    data = {
      "title": ".job-title",
      "categories": ".job-tags li a"
    };
  }

  res.json({
    "data": data,
    "jsonapi": {
      "version": "1.0.0"
    }
  });
});

module.exports = router;
