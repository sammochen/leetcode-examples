const icons = {
  enabled: "./images/on/32.png",
  disabled: "./images/off/32.png",
};

/**
 * Checks if URL contains leetcode
 */
const isWhitelisted = (url) => {
  if (!url) return false;
  return url.includes("leetcode.com");
};

/**
 * Async wrapper around chrome sendMessage function
 * Returns promise of message response
 */
const sendMessagePromise = (tabId, args) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, args, (response) => {
      try {
        resolve(response);
      } catch (e) {
        reject("something wrong");
      }
    });
  });
};

/**
 * Updates the extension icon.
 * If on a LeetCode site and there are testcases, it will be on
 * Otherwise, it will be off (including any exceptions)
 */
const updateIcon = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  try {
    if (!isWhitelisted(tab.url)) {
      throw new Error("not leetcode.com");
    }

    // try to send the active tab a message
    const testcases = await sendMessagePromise(tab.id, {
      text: "query_testcases",
    });

    if (!testcases || testcases.trim().length === 0) {
      throw new Error("no testcases");
    }

    // enable
    chrome.action.setIcon({ path: icons.enabled });
    chrome.action.setPopup({ popup: "popup.html" });
  } catch {
    // disable
    chrome.action.setIcon({ path: icons.disabled });
    chrome.action.setPopup({ popup: "" });
  }
};

// Update when tabs are switched or entering new site
chrome.tabs.onActivated.addListener(updateIcon);
chrome.tabs.onUpdated.addListener(updateIcon);
