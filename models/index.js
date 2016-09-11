'use strict';

var gcloud = require('google-cloud');
var datastore = gcloud.datastore({
  projectId: 'prototype-content-consumer',
  keyFilename: './credentials/gcloud-data-store-private-key.json'
});

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
  }
  catch (e) {
     return errorCallback(e);
  }
}

var model = {
  savePayload: function(payload, successCallback, errorCallback) {
    validateProduct(payload, errorCallback)

    const collectorKey = datastore.key('Collector');
    const now = new Date()
    payload['created_at'] = now
    payload['updated_at'] = now

    datastore.save({
      key: collectorKey,
      data: payload
    }, function (err) {
      if (err) {
        return errorCallback(err);
      }
    });

    return successCallback(true)
  }
};

module.exports = model;
