const fetch = require('node-fetch');
const https = require('https');

module.exports = {
  fetchTranslation,
  getSourceLang,
  translateText,
  mockFetch
};

const agent = new https.Agent({  
  rejectUnauthorized: false
});

async function fetchTranslation(inputText, targetLang) {
  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: inputText,
        source: "auto",
        target: targetLang,
        format: "text",
        api_key: ""
      }),
      headers: { "Content-Type": "application/json" },
      agent
    });

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

async function getSourceLang(inputText) {
  const data = await fetchTranslation(inputText, "en");
  return data.detectedLanguage;
}

async function translateText(inputText) {
  const sourceLang = await getSourceLang(inputText);
  if (sourceLang != "ja") {
    const data = await fetchTranslation(inputText, "ja");
    return data.translatedText;
  } else {
    const data = await fetchTranslation(inputText, "en");
    return data.translatedText;
  }
}

translateText("Hello, world!").then(console.log);

async function mockFetch(inputString) {
  document.getElementById("output").innerText = inputString + "fetched mock";
}