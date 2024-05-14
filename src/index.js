let words;

fetch('../dict/simplified_dictionnary.json')
.then(response => response.json())
.then(data => {
    words = data;
    console.log(words);
})
.catch(error => console.error('Error loading JSON file:', error));

let inputLang = "en";
let outputLang = "ja";
let inputCharType = "undefined";


async function setLang(inputCharType){
  if (inputCharType == "roman"){
    inputLang = "en";
    outputLang = "ja";
  }
  else if (inputCharType == "kana"){
    inputLang = "ja";
    outputLang = "en";
  }
  else if (inputCharType == "kanji"){
    inputLang = "ja";
    outputLang = "en";
  }
  else throw "Invalid inputCharType";
}

//The dictionnary file is dict/simplified_dictionnary.json

// Translation
async function fetchAndTranslate(inputString) {
  //define the input and output language
  let firstChar = inputString.charAt(0);
  if (firstChar.match(/[a-zA-Z]/)){
    inputCharType = "roman";
  }
  else if (firstChar.match(/[\u3040-\u309F]/)){
    inputCharType = "kana";
  }
  else if (firstChar.match(/[\u4E00-\u9FAF]/)){
    inputCharType = "kanji";
  }
  else throw "Invalid inputCharType";
  await setLang(inputCharType);
  //update the flags
  updateFlags();

  //look into the json dictionnary
  if (inputCharType == "roman"){
    for (let word in words){
      if (word["e"] == inputString){
        return[word["kj"], word["kn"]];
      }
      return null;
    }
  }
  else if (inputLang == "kanji"){
    for (let word in words){
      if (word["kj"] == inputString){
        return[word["e"]];
      }
      return null;
    }
  }
  else if (inputLang == "kana"){
    for (let word in words){
      if (word["kn"] == inputString){
        return[word["e"]];
      }
      return null;
    }
  }
}

async function fillOutput(inputString) {
  let translatedString = await fetchAndTranslate(inputString);
  document.getElementById("output").innerText = translatedString[0];
}

// Flags
async function updateFlags() {
  document.getElementById("top-section").style.backgroundImage = `url(../data/flags/${inputLang}.png)`;
  document.getElementById("bottom-section").style.backgroundImage = `url(../data/flags/${outputLang}.png)`;
}

// Event listeners
document.getElementById('input').addEventListener('input', function(event) {
  fillOutput(event.target.value); //replace fillOutput with mockFill for testing
});