/**
 * Retrieves all the test cases in the page
 * @returns
 */
const getTestCases = () => {
  const strongs = document.getElementsByTagName("strong");
  const allInputs = [];
  for (const strong of strongs) {
    if (strong.innerText === "Input:") {
      const s = strong.nextSibling.nodeValue;

      const inputs = [""];
      let dep = 0;
      for (let i = 0; i < s.length; i++) {
        if (s[i] === "[") dep++;
        else if (s[i] === "]") dep--;

        if (dep === 0 && s[i] === ",") {
          inputs.push("");
        } else {
          inputs[inputs.length - 1] += s[i];
        }
      }

      for (let i = 0; i < inputs.length; i++) {
        // delete all before = and trim
        const equalIndex = inputs[i].indexOf("=");
        allInputs.push(inputs[i].substr(equalIndex + 1).trim());
      }
    }
  }
  return allInputs;
};

const main = () => {
  document.addEventListener("keydown", (e) => {
    if (e.isTrusted && e.key === "s" && e.metaKey) {
      e.stopPropagation();
      e.preventDefault();

      const testCases = getTestCases();
      console.log("Got testcases:", testCases);
      console.log("In clipboard:");
      navigator.clipboard.writeText(testCases.join("\n"));
    }
  });
};

main();
