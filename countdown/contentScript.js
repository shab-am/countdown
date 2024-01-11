/// Function to detect countdown timers and specific text phrases indicating timers
function detectCountdownPatterns() {
  const countdownPatterns = [];
  const timerElements = document.querySelectorAll('.countdown-timer-class, [id*="countdown"], [class*="countdown"], [id*="timer"], [class*="timer"], :not(script):not(style)');

  timerElements.forEach(function (timer) {
    const timerText = timer.textContent.trim().toLowerCase();

    // Check if the timer text contains specific phrases indicating timers
    if (
      timerText.includes('ends in') ||
      timerText.includes('remaining time') ||
      timerText.includes('deal finishes in')
    ) {
      countdownPatterns.push({
        text: timerText,
        element: timer,
        pattern: 'Text phrase indicating timer',
      });
    }

    // Check if the element's ID or class contains 'countdown' or 'timer'
    const elementID = timer.id.toLowerCase();
    const elementClass = timer.className.toLowerCase();

    if (
      elementID.includes('countdown') ||
      elementID.includes('timer') ||
      elementClass.includes('countdown') ||
      elementClass.includes('timer')
    ) {
      countdownPatterns.push({
        text: timerText,
        element: timer,
        pattern: 'ID or class indicating timer',
      });
    }

    // Assuming the timer displays as HH:MM:SS format
    const timerValue = timer.textContent.trim();
    const timerPattern = /^\d{1,2}:\d{2}:\d{2}$/; // Example pattern: 12:34:56

    if (timerPattern.test(timerValue)) {
      countdownPatterns.push({
        text: timerText,
        element: timer,
        pattern: 'Timer value pattern',
      });
    }

    // Logic for detecting countdown patterns based on changes in text content
    const nodeOld = timer.dataset.oldText ? { innerText: timer.dataset.oldText } : null;
    if (detectCountdownPattern(timer, nodeOld)) {
      countdownPatterns.push({
        text: timerText,
        element: timer,
        pattern: 'Detected countdown pattern', // Adjust this based on your requirement
      });
    }
    timer.dataset.oldText = timer.textContent.trim(); // Store the current text for future comparison
  });

  return countdownPatterns;
}

// Function to detect countdown pattern based on changes in text content
function detectCountdownPattern(node, nodeOld) {
  if (nodeOld && node.innerText !== nodeOld.innerText) {
    const reg = /(?:\d{1,2}\s*:\s*){1,3}\d{1,2}|(?:\d{1,2}\s*(?:days?|hours?|minutes?|seconds?|tage?|stunden?|minuten?|sekunden?|[a-zA-Z]{1,3}\.?)(?:\s*und)?\s*){2,4}/gi;

    const regBad = /(?:\d{1,2}\s*:\s*){4,}\d{1,2}|(?:\d{1,2}\s*(?:days?|hours?|minutes?|seconds?|tage?|stunden?|minuten?|sekunden?|[a-zA-Z]{1,3}\.?)(?:\s*und)?\s*){5,}/gi;

    let matchesOld = nodeOld.innerText.replace(regBad, "").match(reg);
    let matchesNew = node.innerText.replace(regBad, "").match(reg);

    if (
      matchesNew === null ||
      matchesOld === null ||
      (matchesNew !== null &&
        matchesOld !== null &&
        matchesNew.length !== matchesOld.length)
    ) {
      return false;
    }

    for (let i = 0; i < matchesNew.length; i++) {
      let numbersNew = matchesNew[i].match(/\d+/gi);
      let numbersOld = matchesOld[i].match(/\d+/gi);

      if (numbersNew.length !== numbersOld.length) {
        continue;
      }

      for (let x = 0; x < numbersNew.length; x++) {
        if (parseInt(numbersNew[x]) > parseInt(numbersOld[x])) {
          break;
        }
        if (parseInt(numbersNew[x]) < parseInt(numbersOld[x])) {
          return true;
        }
      }
    }
  }
  return false;
}

// Send a message to the popup with information about detected countdown patterns
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getCountdownPatterns") {
    const detectedPatterns = detectCountdownPatterns();
    sendResponse({ detectedPatterns });
  }
});
