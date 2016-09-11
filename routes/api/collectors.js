var express = require('express');
var router = express.Router();
var model = require('../../models/index');

function validateProduct(payload) {
  try {
    var errors = [];

    if (Object.keys(payload).length === 0 && payload.constructor === Object) {
      errors.push("Empty payload")
    }

    if (!payload.payload.nonce) {
      errors.push("Payload does not have a nonce")
    }

    if (!payload.payload) {
      errors.push("Payload does not have a payload object")
    }

    if (!payload.hostname) {
      errors.push("Payload does not have a hostname")
    }

    if (errors.length >= 1) {
      throw errors
    }

    return model.savePayload(payload, function(success) {
        return success;
      }, function(errors) {
        return errors;
    })
  }
  catch (e) {
     return e;
  }
}

function saveCollector(fields) {
  try {
    return validateProduct(fields)
  }
  catch (e) {
     return e;
  }
}

router.post('/', function(req, res, next) {
  let promise = new Promise(function(resolve, reject){
    var res = saveCollector(req.body)
    if (res == true) {
      resolve(res)
    }
     else {
       reject(res)
     }
  });

  promise.then( function(result) {
    res.json({
      "data": true,
      "jsonapi": {
        "version": "1.0.0"
      }
    })
  })
  .catch(
    function(reason) {
      res.json({ errors: reason})
  })
})

module.exports = router;
