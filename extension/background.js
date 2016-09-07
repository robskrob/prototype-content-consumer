chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('background.js', 'send message');

    chrome.tabs.sendMessage(tabs[0].id, {
      "message": "submit_position"
    });
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "processed_position") {
      console.log('background.js', request.position);
    }
  }
);
