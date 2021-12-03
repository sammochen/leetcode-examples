const main = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const textarea = document.getElementById("textarea");

  // Updates the text of the textarea and adjusts the height to fit text
  const updateTextArea = (text) => {
    if (text === undefined) text = "";
    textarea.value = text;
    textarea.style.overflowY = "hidden";
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    textarea.select();
  };

  // Request the content.js service and update textarea
  chrome.tabs.sendMessage(
    tab.id,
    {
      text: "query_testcases",
    },
    (res) => {
      updateTextArea(res);
    }
  );
};

main();
