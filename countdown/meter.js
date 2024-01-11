console.log(window.popupValues.updatedKey);
console.log(window.popupValues.updatedKey.level);

    const path = document.querySelector("#path");
    console.log(path);
    function updateArcLength(value) {
        const arc_length = path.getTotalLength();
        const step = arc_length / (100 - 0); // Assuming a range from 0 to 100 for deception_level
        const calculatedValue = (value - 0) * step;

        console.log("Calculated Value:", calculatedValue);

        path.style.strokeDasharray = `${calculatedValue} ${arc_length - calculatedValue}`;
        console.log("Stroke Dasharray:", path.style.strokeDasharray);
    }
// Dark pattern IDs, corresponding deception levels, and sentences
const darkPatterns = {
    disguisedAds: { level: 33, sentence: "Alert: Disguised ads spotted! Exercise caution, these might not be what they seem!" },
    confirmshaming: { level: 47, sentence: "Caution: Confirmshaming tactic in use. Beware of coercive prompts or manipulative language!" },
    trickyQuestions: { level: 59, sentence: "Warning: Tricky questions identified! Stay vigilant against misleading prompts!" },
    countdown: { level: 59, sentence: "Attention: Countdown tactic triggered! Act fast, but be aware of urgency manipulation!"},
    priceComparisonPrevention: { level: 54, sentence: "Alert: Prevention of price comparison detected! Your ability to compare prices might be restricted!" },
    friendSpam: { level: 78, sentence: "Caution: Friend spam detected! Be wary of unsolicited or misleading friend requests/messages!" },
    misdirection: { level: 78, sentence: "Warning: Misdirection tactic in use! Watch out for redirected attention or misleading information!"},
    sneakIntoBasket: { level: 41, sentence: "Attention: Item sneakily added to your basket! Verify before checkout to avoid unwanted purchases!" },
    preCheckedCheckboxes: { level: 41, sentence: "Alert: Pre-checked checkbox identified! Uncheck to avoid unintended commitments or subscriptions!"},
    roachMotel: { level: 93, sentence: "Caution: Roach Motel tactic detected! Difficulties in opting out might be encountered!" },
    hiddenCosts: { level: 93, sentence: "Warning: Hidden costs spotted! Beware of undisclosed fees or charges!"},
    baitAndSwitch: { level: 64, sentence: "Alert: Bait and switch tactic detected! Watch for misrepresented offers or services!" },
    privacyZuckering: { level: 86, sentence: "Caution: Privacy Zuckering tactic in use. Your privacy might be compromised!" },
    forcedContinuity: { level: 80, sentence: "Attention: Forced continuity tactic in action! Beware of obligations extending beyond your choice!" }
};
console.log(darkPatterns["preCheckedCheckboxes"]);
console.log(window.popupValues.updatedKey.level);
console.log(window.popupValues.updatedKey);
console.log(typeof window.popupValues.updatedKey);
// Function to update the deception meter and display detected pattern information
function updateDeceptionMeter(patternID) {
    const patternInfo = document.getElementById('patternInfo');
    const deception_level = document.getElementById('deception_level');

console.log(darkPatterns.hasOwnProperty(window.popupValues.updatedKey))


    if (darkPatterns.hasOwnProperty(patternID)) {
        const { level, sentence } = darkPatterns[patternID];
        updateArcLength(darkPatterns[window.popupValues.updatedKey].level);
    } else {
        console.log('Dark pattern not found!');
    }
}

// Example usage: Update the deception meter for a specific dark pattern
// Replace 'examplePatternID' with the ID of the detected dark pattern
updateDeceptionMeter(window.popupValues.updatedKey);
updateArcLength(darkPatterns[window.popupValues.updatedKey].level); // For example, updating the meter for Disguised Ads
