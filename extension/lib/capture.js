let $ = require('jquery');

let setObjectValue = (object, key, value) => {
  if (value) {
    object[key] = value;
  }

  return object;
};

let constructProduct = (host, callback) => {
  let url      = `https://localhost/api/v1/suppliers/${host}`;
  let promise  = $.getJSON(url);

  promise.done((json, status, xhr) => {
    let supplier = json.data[0];
    let selectors = supplier.attributes.selectors;

    let initialObject = {
      host: location.hostname,
      location: location.href
    };

    let object = Object.keys(selectors).reduce((object, key) => {
      let selector  = selectors[key];
      let attribute = selector.attribute;

      let elements  = $(selector.path);

      if (elements.length > 1) {
        object[key] = [];

        for (let c = 0; c < elements.length; c++) {
          object[key].push($(elements[c]).attr(attribute));
        }

      } else {
        object = setObjectValue(object, selector.name, elements.attr(attribute));
      }

      return object;
    }, initialObject);

    callback(object);
  })

  promise.fail(() => {
    throw 'A selector could not be found'
  });
};

export default ({
  constructProduct: constructProduct
})
