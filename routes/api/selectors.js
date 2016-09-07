var express = require('express');
var router = express.Router();

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
