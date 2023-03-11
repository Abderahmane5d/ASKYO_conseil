// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type == "open_popup") {
//       chrome.browserAction.setPopup({
//         popup: "path/to/custom/popup.html",
//         tabId: sender.tab.id
//       });
//       sendResponse({message: "Popup opened"});
//     }
//   });


  // chrome.runtime.sendMessage({type: "open_popup"}, function(response) {
  //   console.log("done");
  // });
 
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getHtml') {
      // send a message to the content script to get the HTML of the page
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getHtml' }, (response) => {
          console.log(response);
          sendResponse(response);
        });
      });
      return true;
    }
  });

  