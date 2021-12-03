const main = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const textarea = document.getElementById("textarea");

  const updateTextArea = (text) => {
    if (text === undefined) text = "";
    textarea.value = text;
    textarea.select();
  };

  textarea.disabled = false;

  chrome.tabs.sendMessage(tab.id, { text: "query_testcases" }, (testcases) => {
    updateTextArea(testcases);
  });
};

main();
