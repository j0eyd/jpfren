let words;
let inputLang = "en", outputLang = "ja";

await fetch('../dict/simplified_dictionnary.json')
.then(response => response.json())
.then(data => {
    words = data.words;
    console.log(words);
})
.catch(error => console.error('Error loading JSON file:', error));

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

function offerNextTranslation(){}

// Translation
async function fetchAndTranslate(inputString) {
  inputString = inputString.toLowerCase();
  let inputCharType = "undefined";
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
  updateFlags();
  console.log(inputCharType);
  console.log(inputString);
  return dictionnaryLookup(inputString, inputCharType);
}


async function dictionnaryLookup(inputString, inputCharType){
  let index, matches = [];
  let inputStrLen = inputString.length;
  console.log(inputStrLen)
  switch (inputCharType){
    case "roman":
      index = "e";
      break;
    case "kanji":
      index = "kj";
      break;
    case "kana":
      index = "kn";
      break;
  }

  for (let element of words) {
    if (inputString == element[index]){
      if (index == "e") matches.push([element["kj"], element["kn"]]);
      else matches.push(element["e"]);
    }
  }
  console.log(matches)
  return matches;
}


async function fillOutput(inputString) {
  let possibleTranslations = await fetchAndTranslate(inputString);
  //if undefined return, no words were found - display no translation.
  if (possibleTranslations[0] == undefined) {
    document.getElementById("output").innerText = "";
  }
  //if there are multiple options, it's kanji and kana, so it's en to jp
  else if (possibleTranslations[0].length > 1) {
    document.getElementById("output").innerText = 
      "Kanji: " + possibleTranslations[0][0] + "\nKana: "
      + possibleTranslations[0][1];
  }
  else document.getElementById("output").innerText = possibleTranslations[0];
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