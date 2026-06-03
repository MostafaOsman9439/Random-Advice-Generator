// Variables
const newAdviceBtn = document.getElementById("new-advice-btn");
const copyBtn = document.getElementById("copy-btn");
const adviceText = document.getElementById("advice-text");
let lastAdvice = ""; // Storing the Advices that were presented

async function getAdvice() {
  try {
    const response = await fetch(
      // (Date.now()) It Prevents The Browser From Crashing
      // + To Make Sure It Doesn't Repeat The Same Advice
      "https://api.adviceslip.com/advice?t=" + Date.now(),
    );
    const data = await response.json();
    const newAdvice = data.slip.advice;

    if (newAdvice === lastAdvice) {
      console.log("Same Advice");
      return getAdvice(); // Calling The Function Again Until It Finds New Advice
    }
    // Storing The New Advices / Updating The Old Advices
    lastAdvice = newAdvice;
    adviceText.innerText = `"${newAdvice}"`;
  } catch (error) {
    adviceText.innerText = "Check your internet connection!";
  }
}

function copyAdvice() {
  // (navigator) Is an Object That Stores The Data Of My Browser
  // (clipboard) The One That Copies
  // Making The Function Copy The InnerText Of The Available Advice (ADvice Text)
  //  And Store it Into The (navigator)
  navigator.clipboard.writeText(adviceText.innerText);
  const originalIcon = copyBtn.innerText;
  copyBtn.innerText = "✅";
  setTimeout(() => {
    copyBtn.innerText = originalIcon;
  }, 1500);
}

newAdviceBtn.addEventListener("click", getAdvice);
copyBtn.addEventListener("click", copyAdvice);

getAdvice();
