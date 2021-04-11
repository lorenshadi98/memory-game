const gameContainer = document.getElementById('game');
const gameStarter = document.getElementById('gameStarter');
const gameHeader = document.querySelector('h1');
const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple'
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
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let cardsArr = [];
let cardsMatched = 0;
// TODO: Implement this function!
// Check if card is facing forward, if it is then return. If the card hasn't been clicked
// Flip the card and then check it with the card in the desk.
function handleCardClick(event) {
  if (cardsArr.length < 2)
    if (!event.target.classList.contains('flipped')) {
      if (cardsArr.length <= 2) {
        let currColor = event.target.className;
        event.target.style.backgroundColor = currColor;
        cardsArr.push(currColor);
        if (cardsArr[0] === cardsArr[1]) {
          flipCards(cardsArr[0]);
          cardsMatched = cardsMatched + 2;
        }
      }
      event.target.classList.add('flipped');
    } else {
      return;
    }
  setTimeout(function () {
    if (!event.target.classList.contains('matched')) {
      event.target.style.backgroundColor = '';
    }
    cardsArr = [];
    event.target.classList.remove('flipped');
  }, 1000);

  // Game Over Handler
  if (cardsMatched === shuffledColors.length) {
    console.log('game over');
    gameStarter.addEventListener('click', function () {
      restartGame();
    });
    gameStarter.innerText = 'Restart Game';
    gameHeader.innerText = 'YOU WIN!';
  }
}
function flipCards(cardColor1) {
  const cards = document.getElementsByClassName(cardColor1);
  for (let card of cards) {
    card.classList.add('matched');
  }
}
function restartGame() {
  location.reload();
}
// when the DOM loads
createDivsForColors(shuffledColors);
