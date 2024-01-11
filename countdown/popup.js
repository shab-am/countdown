// Declare global object
window.popupValues = {};

document.addEventListener("DOMContentLoaded", function () {
    const patternsPromise = new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getCountdownPatterns" }, function (countdownResponse) {
                resolve({ countdown: countdownResponse });
            });
        });
    });

    patternsPromise.then((data) => {
        const [updatedDisplayText, updatedKey] = updatePopupUI(data);

        // Store the updated values in the global object
        window.popupValues = {
            updatedKey,
            updatedDisplayText,
        };

        // Export the updated key and displayText
        exportKeyAndText(window.popupValues.updatedKey, window.popupValues.updatedDisplayText);

        // Now call a function in meter.js
        handleMeterJs();
    });
});

function updatePopupUI(data) {
    const displayAlertElement = document.getElementById("nameOfDarkPattern");
    const checkboxCountElement = document.getElementById("frequency");

    let key; // Declare key locally
    let displayText; // Declare displayText locally

    if (data.countdown && data.countdown.detectedPatterns && data.countdown.detectedPatterns.length > 0) {
        // If countdown patterns are found, update the display
        displayAlertElement.innerText = "Countdown patterns detected!";
        const countdownPatternsCount = data.countdown.detectedPatterns.length;

        // Update the displayText for countdown patterns
        key = "countdownPatternsOnly";
        displayText = displayAlertElement.innerText;

        // Update the count
        checkboxCountElement.innerText = countdownPatternsCount;
    } else {
        // If no countdown patterns are found
        displayAlertElement.innerText = "No countdown patterns found.";
        checkboxCountElement.innerText = "0";
        key = "noCountdownPatterns";

        // Update the displayText
        displayText = displayAlertElement.innerText;
    }

    return [displayText, key];
}

// Function to export the updated key and displayText
function exportKeyAndText(updatedKey, updatedDisplayText) {
    console.log("Exported Key:", updatedKey);
    console.log("Exported DisplayText:", updatedDisplayText);
    // Perform any additional actions needed with the updated key and displayText
}

// Function to handle the execution of meter.js
function handleMeterJs() {
    const meterScript = document.createElement('script');
    meterScript.setAttribute('src', 'meter.js');
    document.head.appendChild(meterScript);
}
