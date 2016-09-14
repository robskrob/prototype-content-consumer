let Entity = require('./entity');

// LUMENS
let suppliers = require('./seeds/suppliers.json');

suppliers.forEach((supplier) => {
  Entity.saveSupplier(null, supplier)
    .then((supplier) => {
      console.log(`successfully created supplier`, supplier, "\n");
    })
    .catch((error) => {
      console.log(`failed to create supplier`, error, "\n");
    });
});

//let samples = require('./seeds/samples.json');
//
//samples.forEach((sample) => {
//  Entity.findSupplier('www.lumens.com')
//    .then((supplier) => {
//      Entity.saveSupplierSample(supplier, sample)
//    })
//    .then((sample) => {
//      console.log(`successfully created sample`, sample, "\n");
//    })
//    .catch((error) => {
//      console.log(`failed to create sample`, error, "\n");
//    });
//});
