let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Hello World!");

  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);

  console.log("Installed - clipboard:");
  console.log(navigator.clipboard);
});

const formatCode = async () => {
  console.log("Hello World Again");
  console.log("Hello!");
  try {
    console.log(navigator.clipboard);
    const text = await navigator.clipboard.readText();
    console.log("Read text!", text);
    await navigator.clipboard.writeText(text + "heheheh");

    console.log("Finished");
  } catch (e) {
    console.log("Some error happened:", e);
  }
};
// background.js
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
  if (command === "format") {
    formatCode();
  }
});
