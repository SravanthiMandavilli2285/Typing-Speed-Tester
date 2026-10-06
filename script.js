// ========================================
// 1. VARIABLES
// ========================================

let time = 0;
let timer = null;
let testFinished = false;


// ========================================
// 2. GET HTML ELEMENTS
// ========================================

const textInput = document.getElementById("text-input");
const textDisplay = document.getElementById("text-display");

const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const restartButton = document.getElementById("restart-button");
const completionMessage =
    document.getElementById("completion-message");


// ========================================
// 3. ORIGINAL SENTENCE
// ========================================

const originalText =
    "The quick brown fox jumps over the lazy dog.";


// ========================================
// 4. DISPLAY SENTENCE
// ========================================

function displayText() {

    textDisplay.innerHTML = "";

    for (let i = 0; i < originalText.length; i++) {

        const span = document.createElement("span");

        span.innerText = originalText[i];

        textDisplay.appendChild(span);
    }
}


// ========================================
// 5. START TIMER
// ========================================

function startTimer() {

    // If timer is already running,
    // don't create another timer.

    if (timer !== null) {
        return;
    }

    timer = setInterval(function () {

        time++;

        timeDisplay.innerText = time;

        updateWPM();

    }, 1000);
}


// ========================================
// 6. UPDATE WPM
// ========================================

function updateWPM() {

    if (time === 0) {
        return;
    }

    const typedText = textInput.value;

    const charactersTyped = typedText.length;

    // Standard typing calculation:
    // 5 characters = 1 word

    const words = charactersTyped / 5;

    const minutes = time / 60;

    const wpm = Math.round(words / minutes);

    wpmDisplay.innerText = wpm;
}


// ========================================
// 7. CHECK ACCURACY
// ========================================

function updateAccuracy() {

    const typedText = textInput.value;

    if (typedText.length === 0) {

        accuracyDisplay.innerText = 0;

        return;
    }

    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === originalText[i]) {

            correctCharacters++;
        }
    }

    const accuracy =
        Math.round(
            (correctCharacters / typedText.length) * 100
        );

    accuracyDisplay.innerText = accuracy;
}


// ========================================
// 8. HIGHLIGHT CHARACTERS
// ========================================

function highlightText() {

    const typedText = textInput.value;

    const characters =
        textDisplay.querySelectorAll("span");


    for (let i = 0; i < characters.length; i++) {

        // Remove old colors

        characters[i].classList.remove("correct");
        characters[i].classList.remove("incorrect");


        // If user has typed this character

        if (i < typedText.length) {

            if (typedText[i] === originalText[i]) {

                characters[i].classList.add("correct");

            } else {

                characters[i].classList.add("incorrect");

            }
        }
    }
}


// ========================================
// 9. CHECK TEST COMPLETION
// ========================================

function checkCompletion() {

    const typedText = textInput.value;

    if (typedText === originalText) {

        // Test is finished

        testFinished = true;

        // Stop timer

        clearInterval(timer);

        timer = null;

        // Update final values

        updateAccuracy();

        updateWPM();

        // Disable typing

        textInput.disabled = true;

        // Show message

        completionMessage.innerText =
            "🎉 Test Completed!";

    }
}


// ========================================
// 10. USER TYPES
// ========================================

textInput.addEventListener("input", function () {

    // Don't do anything after completion

    if (testFinished) {
        return;
    }

    // Start timer

    startTimer();

    // Highlight correct/wrong characters

    highlightText();

    // Calculate accuracy

    updateAccuracy();

    // Calculate WPM

    updateWPM();

    // Check whether test is complete

    checkCompletion();

});


// ========================================
// 11. RESTART BUTTON
// ========================================

restartButton.addEventListener("click", function () {

    // Stop timer

    clearInterval(timer);

    timer = null;


    // Reset time

    time = 0;


    // Reset test status

    testFinished = false;


    // Reset display

    timeDisplay.innerText = "0";

    wpmDisplay.innerText = "0";

    accuracyDisplay.innerText = "0";


    // Clear typing box

    textInput.value = "";


    // Enable typing box

    textInput.disabled = false;


    // Remove completion message

    completionMessage.innerText = "";


    // Display sentence again

    displayText();


    // Put cursor in typing box

    textInput.focus();

});


// ========================================
// 12. INITIALIZE WEBSITE
// ========================================

displayText();