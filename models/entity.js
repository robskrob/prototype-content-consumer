let datastore = require('./datastore');
let Serializer = require('./jsonApiSerializer');

// PRIVATE

let supplierQuery = (host) => {
  return datastore.client.createQuery('Supplier').filter('host', '=', host);
};

// PUBLIC

module.exports.findSupplier = (host) => {
  return datastore.findOne(supplierQuery(host));
};

module.exports.saveSample = (id, payload) => {
  let dataset = {
    data: payload,
    indexedColumns: [
      'host',
      'nonce'
    ]
  };

  return datastore.save(id, ['Sample'], dataset);
};

module.exports.saveSupplier = (id, data) => {
  let dataset = {
    data: data,
    indexedColumns: [
      'host',
      'name'
    ]
  };

  return datastore.save(id, 'Supplier', dataset);
};

module.exports.saveSupplierSample = (supplier, payload) => {
  let dataset = {
    data: payload,
    indexedColumns: [
      'host',
      'nonce'
    ]
  };

  return datastore.save(null, ['Supplier', supplier.key.id, 'Sample'], dataset);
};

// SERIALIZERS

module.exports.serializeJsonSample = Serializer([
  'host',
  'payload',
  'created',
  'updated'
]);

module.exports.serializeJsonSupplier = Serializer([
  'name',
  'selectors',
  'created',
  'updated'
]);
