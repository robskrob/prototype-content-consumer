var express = require('express');
var router = express.Router();

/* GET /api/v1/selectors */
router.get('/', function(req, res, next) {
  let data;

  if (req.query.host === 'jobs.lever.co') {
    data = {
      'logo': {
        'selector': '.main-header-logo img',
        'attribute': 'src'
      },
      'title': {
        'selector': '.posting-headline h2',
        'attribute': 'value'
      },
      'categories': {
        'selector': '.posting-categories .posting-category',
        'attribute': 'value'
      },
      'responsibilities': {
        'selector': "h3:contains('Responsibilities') + .posting-requirements li",
        'attribute': 'value'
      }
    };
  } else if (req.query.host === 'www.lumens.com') {
    data = {
      'product_id': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] > [data-pid]:first',
        'attribute': 'data-pid'
      },
      'product_url': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] [itemprop="url"]:first',
        'attribute': 'content'
      },
      'product_name': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] [itemprop="name"]:first',
        'attribute': 'innerText'
      },
      'product_brand_name': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] [itemscope][itemtype="http://schema.org/Brand"] meta[itemprop="name"]:first',
        'attribute': 'content'
      },
      'product_offer': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] [itemscope][itemtype="http://schema.org/Offer"] meta[itemprop="price"]:first',
        'attribute': 'content'
      },
      'product_image_url': {
        'selector': '[itemscope][itemtype="http://schema.org/Product"] .productimages meta[property="og:image"]',
        'attribute': 'content'
      }
    }
  }

  res.json({
    "data": data,
    "jsonapi": {
      "version": "1.0.0"
    }
  });
});

module.exports = router;
