let datastore = require('@google-cloud/datastore');
let config = require('../config/config');

let client = datastore({
  projectId: config.projectId,
  keyFilename: config.googleCloudKey
});

module.exports.client = client;

module.exports.savePayload = (doc, successCallback, errorCallback) => {
  validateProduct(doc)

  if (!validateProduct(doc)) {
    return errorCallback(doc.errors)
  }

  const collectorKey = client.key('Collector');
  const now = new Date()

  doc['created_at'] = now
  doc['updated_at'] = now

  client.save({
    key: collectorKey,
    data: doc
  }, function (err, res) {
    if (err) {
      errorCallback(err);
    } else {
      successCallback(collectorKey);
    }
  });
};

function validateProduct(doc) {
  doc.errors = []

  if (Object.keys(doc).length === 0) {
    errors.push("Empty payload")
  }

  if (!doc.nonce) {
    errors.push("Payload does not have a nonce")
  }

  if (!doc.payload) {
    errors.push("Payload does not have a payload object")
  }

  if (!doc.hostname) {
    errors.push("Payload does not have a hostname")
  }

  if (doc.errors.length >=1) {
    return false
  } else {
    return true
  }
}
