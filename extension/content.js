chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('content.js', 'receive message');

    if (request.message === "submit_position") {
      constructPosition(function(position) {
        console.log(position);

        chrome.runtime.sendMessage({
          "message": "processed_position",
          "position": position
        });
      });
    }
  }
);
