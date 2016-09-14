let jQuery = require('jquery');

let constructSample = (host, callback) => {
  let url      = `https://localhost/api/v1/suppliers/${host}`;
  let promise  = jQuery.getJSON(url);

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

      let elements  = jQuery(selector.path);

      if (elements.length > 1) {
        object[key] = [];

        for (let c = 0; c < elements.length; c++) {
          object[key].push(jQuery(elements[c]).attr(attribute));
        }

      } else {
        object = setObjectValue(object, selector.name, elements.attr(attribute));
      }

      return object;
    }, initialObject);

    callback(object);
  })

  promise.fail(() => {
    console.log(`Supplier ${location.hostname} was not found`);
  });
};

let postJsonPromise = (url, object) => {
  return jQuery.ajax({
    contentType: 'application/json; charset=utf-8',
    data: object,
    dataType: 'json',
    method: 'POST',
    url: url
  });
};

let publishSamples = (object) => {
  let host = object.host;
  delete object.host;

  let promise = postJsonPromise('https://localhost/api/v1/samples', JSON.stringify({
    host: host,
    payload: object
  }));

  promise.done((json, state, xhr) => {
  });

  promise.fail((error) => {
    throw 'Sample API failure'
  });
};

let setObjectValue = (object, key, value) => {
  if (value) {
    object[key] = value;
  }

  return object;
};

export default ({
  constructSample: constructSample,
  publishSamples: publishSamples
})
