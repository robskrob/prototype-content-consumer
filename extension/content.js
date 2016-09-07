let constructPosition = require('./lib/position.js').default;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('content.js', 'receive message');

    if (request.type === "capture_position") {
      constructPosition(function(position) {
        console.log('position:', position);

        chrome.runtime.sendMessage({
          "type": "processed_position",
          "position": position
        });
      });
    }
  }
);
