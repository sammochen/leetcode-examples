const icons = {
  enabled: "/images/on.png",
  disabled: "/images/off.png",
};

const isWhitelisted = (url) => {
  if (!url) return false;
  return url.includes("leetcode");
};

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  const tab = await getCurrentTab();

  if (tab && isWhitelisted(tab.url)) {
    console.log("whitelisted");
    await chrome.action.setIcon({ path: icons.enabled });
    await chrome.action.setPopup({ popup: "popup.html" });
  } else {
    console.log("blacklisted");

    await chrome.action.setIcon({ path: icons.disabled });
    await chrome.action.setPopup({ popup: "" });
  }
});
