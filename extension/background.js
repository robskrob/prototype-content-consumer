chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('background.js', 'send message');

    chrome.tabs.sendMessage(tabs[0].id, {
      "type": "capture_product"
    });
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === "processed_product") {
      console.log('background.js', request.product);
    }
  }
);
