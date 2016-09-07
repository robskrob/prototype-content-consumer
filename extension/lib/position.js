let $ = require('jquery');

let isImage = function(element) {
  return element.prop('tagName') === 'IMG';
};

let setPositionValue = function(position, key, value) {
  if (value) {
    position[key] = value;
  }

  return position;
};

let constructPosition = function(callback) {
  let url      = 'https://localhost/api/v1/selectors';
  let promise  = $.getJSON(url, {
    host: location.host
  });

  promise.done(function(json, status, xhr) {
    let position = Object.keys(json.data).reduce(function(position, key) {
      let elements = $(json.data[key]);

      if (elements.length > 1) {
        position[key] = [];

        for (let c = 0; c < elements.length; c++) {
          position[key].push($(elements[c]).text());
        }

      } else {
        if (isImage(elements)) {
          position = setPositionValue(position, key, elements.prop('src'));
        } else {
          position = setPositionValue(position, key, elements.text());
        }
      }
      return position;
    }, {});

    position['url'] = location.href;

    callback(position);
  })

  promise.fail(function() {
    throw 'A selector could not be found'
  });
};

export default constructPosition
