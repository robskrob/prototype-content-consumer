let capture = require('./lib/capture').default;

let onLoad = (event) => {
  capture.constructSample(location.host, function(samples) {
    chrome.runtime.sendMessage({
      "type": "publish_samples",
      "samples": samples
    });
  });
};

window.addEventListener('load', onLoad, false);
