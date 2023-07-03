//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//get array from leters
let letterArray = Array.from(letters);

//select leters container
let lettersContainer = document.querySelector(".letters");

//generate letters
letterArray.forEach( el => {
  //creating span
  let span = document.createElement("span");
  //creat text node and append to span
  //let chars = document.createTextNode(el);
  span.appendChild(document.createTextNode(el));
  //adding class to span
  span.className = "chr-box";
  //append span to letter container
  lettersContainer.appendChild(span);
});

//object of words and its categories

const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

//get random property

let allKeys = Object.keys(words);
// all keys will contain the keys of object words "programming, movies,people, countries"
//allKeys = array contain the keys of object
//console.log(allKeys);
// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);// rand value from 0 to 3 will be stored
//console.log(Math.random() * allKeys.length); -> generate num less than 4
// Category
let randomPropName = allKeys[randomPropNumber]; 
// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letter-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === ' ') {
    // Add Class To The Span
    emptySpan.className = 'with-space';
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);

});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letter-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hang-man-draw");

// handling

document.addEventListener("click", (e)=>{
  let statusw = false;

  if(e.target.className === "chr-box"){
    e.target.classList.add("clicked");
    let clicked = e.target.innerHTML.toLowerCase();

    lettersAndSpace.forEach((w,i)=>{
      if (clicked == w.toLowerCase()) {
        statusw = true;
        let s = document.querySelectorAll(".letter-guess span")[i];
        s.appendChild(document.createTextNode(`${lettersAndSpace[i]}`));
      }
    });
    if (statusw !== true) {
      document.getElementById("fail").play();
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 8) {

        endGame();

        lettersContainer.classList.add("finished");
        document.getElementById("gover").play();

      }
    } else{
      // Play Success Sound
      document.getElementById("success").play();
    }
  }

});

// End Game Function
function endGame() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);

}

