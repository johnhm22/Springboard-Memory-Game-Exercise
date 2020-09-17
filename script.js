const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


// TODO: Implement this function!

let clickCount = 0;
let cardClickedTempRecord =[];
let totalClicks = 0;
let ranking  = [];
let clicks = document.querySelector('#totalClicks');



//Make sure that you cannot click too quickly and guess more than two cards at a time.


function handleCardClick(event) {

  //pushes clicked div into an array
  cardClickedTempRecord.push(event.target);

  //keeps a count of number of cards selected to avoid more than two being exposed (see if condition at bottom of function)
  clickCount++;
  totalClicks++;

  clicks.innerText = totalClicks;

  // you can use event.target to see which element was clicked
 let cardColor = event.target.className; //this retieves the class(color);

  //variable created for selected card
 let targetCard = event.target;

// if same card clicked twice, changes color to null
  if(targetCard.style.backgroundColor){
    targetCard.style.backgroundColor = null;
  }
  
  //sets color of card
  //it is here that I need to prevent the color of a third card being revealed
  // perhaps a separate function that iterates through the divs to check how many have the color set
  targetCard.style.backgroundColor = cardColor;
  
  // revealColorWithDelay()

  // configures two cards with the same color with the class "match"
  //examines two selected cards in a temp array to assess if color is the same
  //also, ensures the two cards are not the same card
  if(cardClickedTempRecord.length>1 && cardClickedTempRecord[0].className === cardClickedTempRecord[1].className && cardClickedTempRecord[0] != cardClickedTempRecord[1]){
    cardClickedTempRecord[0].classList.add('match');
    cardClickedTempRecord[1].classList.add('match');
  }
 
//ensures no more than two cards can be turned over to show their color
if(clickCount === 2){
  revertCardColor();
  clickCount = 0;
  cardClickedTempRecord.splice(0);
  };
}

//function that defines the 1 sec delay between the second card being selected and both cards having color removed if there is no match
function revertCardColor(){
  setTimeout(removeCardColor, 1000);
}

//iterates through all divs to change color to null, but ignores cards that have been matched
function removeCardColor(){
  allDivs = document.querySelectorAll('div');
  for(let div of allDivs){
    if(!div.classList.contains('match')){
      div.style.backgroundColor = null;
    }
  }
}


//trigges reset() when Reset button clicked
resetButton = document.querySelector('button');
resetButton.addEventListener('click', function(){
  reset()
  }
);

//removes all divs, creates them again with a new set of colors
function reset(){
  let clearDivs = document.querySelectorAll('div');
  for(let div of clearDivs){
    div.remove();
  };
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    clicks.innerText = 0;
};
