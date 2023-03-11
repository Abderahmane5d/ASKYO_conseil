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

  