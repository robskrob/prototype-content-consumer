let capture = require('./lib/capture').default;

//chrome.browserAction.onClicked.addListener((tab) => {
//  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//    chrome.tabs.sendMessage(tabs[0].id, {
//      "type": "capture_sample"
//    });
//  });
//});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "publish_samples") {
    capture.publishSamples(request.samples);
  }
});
