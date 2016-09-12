let serializer = (attributes) => {
  return (models) => {
    if (!Array.isArray(models)) {
      models = [models];
    }

    let data = models.map((model) => {
      return {
        "type": model.key.kind,
        "id": model.key.id,
        "attributes": attributes.reduce((previous, attribute) => {
          previous[attribute] = model.data[attribute];
          return previous;
        }, {})
      }
    });

    return {
      "data": data,
      "jsonapi": "1.0.0"
    };
  };
};

module.exports.supplier = serializer([
  'selectors'
//  'source_id',
//  'product_url',
//  'product_image_url',
//  'product_brand_name',
//  'product_brand_url',
//  'product_offer',
//  'product_offer_currency'
]);
