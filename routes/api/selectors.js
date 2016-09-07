var express = require('express');
var router = express.Router();

/* GET /api/v1/selectors */
router.get('/', function(req, res, next) {
  let data;

  if (req.query.host === 'jobs.lever.co') {
    data = {
      "title": ".posting-headline h2"
    };
  } else if (req.query.host === 'www.spotify.com') {
    data = {
      "title": ".job-title"
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
