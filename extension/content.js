let capture = require('./lib/capture.js').default;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('content.js', 'receive message');

    if (request.type === "capture_product") {
      capture.constructProduct(location.host, function(product) {
        console.log('product:', product);

        chrome.runtime.sendMessage({
          "type": "processed_product",
          "product": product
        });
      });
    }
  }
);
