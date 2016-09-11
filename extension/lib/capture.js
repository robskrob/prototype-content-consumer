let $ = require('jquery');

let setObjectValue = function(object, key, value) {
  if (value) {
    object[key] = value;
  }

  return object;
};

let constructProduct = function(callback) {
  let url      = 'https://localhost/api/v1/selectors';
  let promise  = $.getJSON(url, {
    host: location.host
  });

  promise.done(function(json, status, xhr) {
    let object = Object.keys(json.data).reduce(function(object, key) {
      let selector  = json.data[key].selector;
      let attribute = json.data[key].attribute;

      let elements = $(selector);

      if (elements.length > 1) {
        object[key] = [];

        for (let c = 0; c < elements.length; c++) {
          object[key].push($(elements[c]).attr(attribute));
        }

      } else {
        object = setObjectValue(object, key, elements.attr(attribute));
      }

      return object;
    }, {});

    object['location'] = location.href;
    object['host']     = location.hostname;

    callback(object);
  })

  promise.fail(function() {
    throw 'A selector could not be found'
  });
};

export default ({
  constructProduct: constructProduct
})
