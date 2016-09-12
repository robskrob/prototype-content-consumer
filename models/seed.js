let datastore = require('./datastore');

// LUMENS
let suppliers = require('./seeds/suppliers.json');

suppliers.forEach((supplier) => {
  datastore.saveSupplier(null, supplier, (supplier) => {
    console.log(`successfully created ${supplier.name} supplier`);
  }, (error) => {
    console.log(`failed to create ${supplier.name} supplier`, error);
  })
});

let samples = require('./seeds/samples.json');

samples.forEach((sample) => {
  datastore.saveSample(null, sample, (sample) => {
    console.log(`successfully created ${sample.host} sample`);
  }, (error) => {
    console.log(`failed to create ${sample.host} sample`, error);
  })
});
