import { translate } from '@vitalets/google-translate-api';

const displayedText = document.getElementById("output").innerText; 

// webpack.config.js
// module.exports = {
//   mode: 'development',
//   entry: './index.js',
//   output : {
//     filename: 'bundle.js'
//   }
// };

async function fetchAndTranslate(inputString) {
  const response = await translate(inputString, { to: 'ja' });
  const returnString = response.text;
  if (response.raw.src === "ja") {
    returnString = await translate(inputString, { to: 'en' });
  }
  return returnString;
}

async function fillOutput(inputString) {
  const translatedString = await fetchAndTranslate(inputString);
  displayedText = translatedString;
}

async function mockFetch(inputString) {
  displayedText = inputString + "fetched mock";
}

// export { fetchAndTranslate, fillOutput, mockFetch };