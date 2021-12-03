const parseTestCasesFromStrongs = (strongs) => {
  // Assumes that "Input:" is <strong>
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

const parseTestCases = () => {
  const strongs = document.getElementsByTagName("strong");
  return parseTestCasesFromStrongs(strongs);
};

chrome.runtime.onMessage.addListener(function (msg, sender, cb) {
  try {
    if (msg.text === "query_testcases") {
      const testcases = parseTestCases();
      cb(testcases.join("\n"));
      return;
    }
  } finally {
    cb("");
  }
});
