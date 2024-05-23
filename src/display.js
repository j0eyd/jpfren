//Flags
async function updateFlags(inputLang, outputLang) {
    document.getElementById("input-flag").src = `../data/flags/${inputLang}.png`;
    document.getElementById("output-flag").src = `../data/flags/${outputLang}.png`;
  }

//display the number of translations and handle arrow hiding
async function displayOtherMeaningOptions(PTLength){
    if (PTLength < 2){
      document.getElementById("right-arrow").style.display = "none";
      document.getElementById("left-arrow").style.display = "none";
      document.getElementById("translation-info").innerText = "";
    }
    else {
      document.getElementById("right-arrow").style.display = "block";
      document.getElementById("left-arrow").style.display = "block";
    }
  }

export { updateFlags, displayOtherMeaningOptions };