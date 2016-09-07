var constructPosition = function(callback) {
  var url      = 'https://localhost/api/v1/selectors';
  var promise  = $.getJSON(url, {
    host: location.host
  });

  promise.done(function(json, status, xhr) {
    var position = Object.keys(json.data).reduce(function(position, key) {
      position[key] = $(json.data[key]).text();
      return position;
    }, {});

    position['url'] = location.href;

    callback(position);
  })

  promise.fail(function() {
    throw 'A selector could not be found'
  });
};

