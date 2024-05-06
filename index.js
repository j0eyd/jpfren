const fetch = require('node-fetch');
module.exports = translateText;

async function translateText(inputString) {
  const res1 = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: inputString,
      source: "auto",
      target: "en",
      format: "text",
      api_key: ""
    }),
    headers: { "Content-Type": "application/json" }
  });
  result = await res1.json();
  if (result["detectedLanguage"] != "en"){
    return result["translatedText"];
  }
  else {
    const res2 = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: inputString,
        source: "auto",
        target: "jp",
        format: "text",
        api_key: ""
      }),
      headers: { "Content-Type": "application/json" }
    });
    result = await res2.json();
    return result["translatedText"];
  }
}

