/**
 * Parses all test cases from current document
 * Assumes:
 * - "Input:" is in strong tag
 * - The test cases follows the equal sign
 * - Multiple parameters are separated by comma
 */
const parseTestCases = () => {
  const strongs = document.getElementsByTagName("strong");
  const allLines = [];
  for (const strong of strongs) {
    if (strong.innerText === "Input:") {
      const s = strong.nextSibling.nodeValue;

      const items = [""];
      let dep = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "[") dep++;
        else if (s[i] === "]") dep--;

        if (dep === 0 && s[i] === ",") {
          items.push("");
        } else {
          items[items.length - 1] += s[i];
        }
      }

      for (let i = 0; i < items.length; i++) {
        // delete all before = and trim
        const equalIndex = items[i].indexOf("=");
        const line = items[i].substr(equalIndex + 1).trim();
        allLines.push(line);
      }
    }
  }
  return allLines;
};

// Parses testcases as a service
chrome.runtime.onMessage.addListener(async (msg, _, cb) => {
  if (msg.text === "query_testcases") {
    const testcases = parseTestCases();
    cb(testcases.join("\n"));
  } else {
    cb("");
  }
});
