import { translate } from '@vitalets/google-translate-api';
import tunnel from 'tunnel';

const inputLang = "en";
const outputLang = "ja";

// Proxy
// let agent = createHttpProxyAgent('http://103.152.112.162:80');

// Translation
async function fetchAndTranslate(inputString) {
  try {
    let response = await translate(inputString, { to: 'ja'}, {
      agent: tunnel.httpsOverHttp({
        proxy: { 
          host: 'whateverhost',
          proxyAuth: 'user:pass',
          port: '8080',
          headers: {
            'User-Agent': 'Node'
          }
        }
      })});
    if (response.raw.src === "ja") {
      inputLang = "ja";
      outputLang = "en";
      response = await translate(inputString, { to: 'en'}, {
        agent: tunnel.httpsOverHttp({
          proxy: { 
            host: 'whateverhost',
            proxyAuth: 'user:pass',
            port: '8080',
            headers: {
              'User-Agent': 'Node'
            }
          }
        })});
    }
    else {
      inputLang = "en";
      outputLang = "ja";
    }
    const returnString = response.text;
    return returnString;
  } catch (e) {
    if (e.name === 'TooManyRequestsError') {
      console.log('Error 429: Too many requests. Switching to new proxy.');
      
    }
  }
}

window.fillOutput = async function fillOutput(inputString) {
  const translatedString = await fetchAndTranslate(inputString);
  document.getElementById("output").innerText = translatedString;
}

// Event listeners
document.getElementById('input').addEventListener('input', function(event) {
  fillOutput(event.target.value); //replace fillOutput with mockFill for testing
});

window.mockFill = async function mockFill(inputString) {
  document.getElementById("output").innerText = inputString;
}