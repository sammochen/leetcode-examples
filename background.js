// This service worker runs in the background

chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker is running/listening");
});
