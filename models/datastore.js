let datastore = require('@google-cloud/datastore');
let config = require('../config/config');

let client = datastore({
  projectId: config.projectId,
  keyFilename: config.googleCloudKey
});

module.exports.client = client;

module.exports.findAll = (query, successCallback, errorCallback) => {
  client.runQuery(query, (error, entities) => {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(entities);
    }
  });
};

module.exports.findOne = (query, successCallback, errorCallback) => {
  client.runQuery(query.limit(1), (error, entities) => {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(entities[0]);
    }
  });
};

module.exports.findSupplier = (host, successCallback, errorCallback) => {
  module.exports.findOne(supplierQuery(host), successCallback, errorCallback);
};

module.exports.save = (id, kind, dataset, successCallback, errorCallback) => {
  let key;

  if (id) {
    key = client.key([kind, parseInt(id, 10)]);
  } else {
    key = client.key(kind);
  }

  let entity = {
    key: key,
    data: toDatastore(dataset)
  };

  client.save(entity, (error) => {
    if (error) {
      errorCallback(error);
    } else {
      successCallback(dataset.data);
    }
  });
};

module.exports.saveSupplier = (id, data, successCallback, errorCallback) => {
  let dataset = {
    data: data,
    indexedColumns: [
      'selectors'
    ]
  };

  module.exports.save(id, 'Supplier', dataset, successCallback, errorCallback);
};

// PRIVATE

let supplierQuery = (host) => {
  return client.createQuery('Supplier').filter('host', '=', host);
};

let toDatastore = (dataset) => {
  return Object.keys(dataset.data).reduce((list, c) => {
    if (dataset.data[c]) {
      list.push({
        name: c,
        value: dataset.data[c],
        excludeFromIndexes: (dataset.nonIndexed || []).indexOf(c) !== -1
      })
    }

    return list;
  }, []);
};
