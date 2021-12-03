const icons = {
  enabled: "./images/on/32.png",
  disabled: "./images/off/32.png",
};

const isWhitelisted = (url) => {
  if (!url) return false;
  return url.includes("leetcode.com");
};

const setGoodIcon = () => {
  chrome.action.setIcon({ path: icons.enabled });
  chrome.action.setPopup({ popup: "popup.html" });
};

const setBadIcon = () => {
  chrome.action.setIcon({ path: icons.disabled });
  chrome.action.setPopup({ popup: "" });
};

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

const updateIcon = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);

  try {
    if (!isWhitelisted(tab.url)) throw new Error("not leetcode.com");

    // try to send the active tab a message
    const testcases = await sendMessagePromise(tab.id, {
      text: "query_testcases",
    });

    if (!testcases || testcases.trim().length === 0)
      throw new Error("no testcases");

    setGoodIcon();
  } catch {
    setBadIcon();
  }
};

chrome.tabs.onActivated.addListener(updateIcon);
chrome.tabs.onUpdated.addListener(updateIcon);
