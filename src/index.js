import { translate } from '@vitalets/google-translate-api';
// import tunnel from 'tunnel';

const inputLang = "en";
const outputLang = "ja";


// Translation
async function fetchAndTranslate(inputString) {
  try {
    let response = await translate(inputString, { to: 'ja', fetchOptions: { agent } });
    if (response.raw.src === "ja") {
      inputLang = "ja";
      outputLang = "en";
      response = await translate(inputString, { to: 'en', fetchOptions: { agent } });
    }
    else {
      inputLang = response.raw.src;
      outputLang = "ja";
    }
    const returnString = response.text;
    updateFlags();
    return returnString;
  } catch (e) {
    if (e.name === 'TooManyRequestsError') {
      console.log('Error 429: Too many requests. Switching to new proxy.');
    }
  }
}

window.fillOutput = async function fillOutput(inputString) {
  const translatedString = await fetchAndTranslate(inputString);
  document.getElementById("output").innerText = "lalala";
}

// Flags
async function updateFlags() {
  document.getElementById("top-section").style.backgroundImage = `url(./data/flags/${inputLang}.png)`;
  document.getElementById("bottom-section").style.backgroundImage = `url(./data/flags/${outputLang}.png)`;
}

// Event listeners
document.getElementById('input').addEventListener('input', function(event) {
  fillOutput(event.target.value); //replace fillOutput with mockFill for testing
});

window.mockFill = async function mockFill(inputString) {
  document.getElementById("output").innerText = inputString;
}

