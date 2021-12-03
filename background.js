const icons = {
  enabled: "./images/on/32.png",
  disabled: "./images/off/32.png",
};

const isWhitelisted = (url) => {
  if (!url) return false;
  return url.includes("leetcode.com");
};

const updateIcon = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  if (isWhitelisted(tab.url)) {
    chrome.action.setIcon({ path: icons.enabled });
    chrome.action.setPopup({ popup: "popup.html" });
  } else {
    chrome.action.setIcon({ path: icons.disabled });
    chrome.action.setPopup({ popup: "" });
  }
};

chrome.tabs.onActivated.addListener(updateIcon);
chrome.tabs.onUpdated.addListener(updateIcon);
