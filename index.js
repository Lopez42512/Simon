// randomly generate number place number into array
// button is lit base on the number
// when number is pressed the user input is placed into an array and the two array are compared
// if correct the sequence is continue else game over is printed
let level = 0;
let gameChoice = [];
let playerChoice = [];
let id = 0;

function displayLevel() {
  document.getElementById("level").innerHTML = `Level: ${level}`;
}

// grabs the users selection
function playerPick(document) {
  // detects the users selection by which button was pressed
  let playerNumber = parseInt(document.name);
  // blinks the users selection
  playerButtonBlink(playerNumber);

  //   pushes the users selection into the playerChoice array
  playerChoice.push(playerNumber);

  //   calls the gameLogic function and if it returns false the game is over
  let checkIfUserGuessCorrect = gameLogic();
  if (checkIfUserGuessCorrect === false) {
    gameOver();
  }
  //   if the user guess correct check to see if the player sequence is the same as the computers to determine if the user is done and the computer can start it's next sequence
  else if (gameChoice.length === playerChoice.length) {
    playerChoice = [];
    setTimeout(() => startGame(), 2000);
  }
}

// Checks to see if the users selection matches the computers and if not returns that the user answered incorrectly
function gameLogic() {
  for (let i = 0; i < playerChoice.length; i++) {
    if (gameChoice[i] === playerChoice[i]) {
      continue;
    } else {
      return false;
    }
  }
}

// Gives the users selection the blinking effect
function playerButtonBlink(choice) {
  document.getElementById(choice).classList.add("toggle");
  setTimeout(
    () => document.getElementById(choice).classList.remove("toggle"),
    1000
  );
}

// fades the button in and out based of the player or computer choice
function buttonBlink(choice) {
  document.getElementById(choice).classList.add("toggle");
  setTimeout(
    () => document.getElementById(choice).classList.remove("toggle"),
    1000
  );
  //   This is here so the buttons take turn blinking instead of them blinking all at once
  setTimeout(() => {
    if (id < gameChoice.length - 1) {
      id++;
      buttonBlink(gameChoice[id]);
    } else {
      id = 0;
    }
  }, 1500);
}

// This function is the computer logic that selects random numbers and blinks the buttons the user has to repeat
function startGame() {
  //   displays the current level to an h1 in the html
  level++;
  displayLevel();

  // Grabs a random number and puts it into the gamechoice array
  let randomPick = Math.floor(Math.random() * 4) + 1;
  gameChoice.push(randomPick);

  // calls the buttonBlink function with the first index of the gamechoice to start off the sequence
  buttonBlink(gameChoice[0]);
}

// The start of the game that clears all of the initial variables and call the startGame function
function playGame() {
  level = 0;
  gameChoice = [];
  playerChoice = [];
  id = 0;
  document.getElementById("startButton").classList.add("hidden");
  startGame();
}

// The end of the game when the user guess wrong, all the variables are reset and the game is reset to the iniatal state
function gameOver() {
  level = 0;
  gameChoice = [];
  playerChoice = [];
  id = 0;
  document.getElementById("level").innerHTML = `Game Over Try Again!`;
  document.getElementById("startButton").classList.remove("hidden");
}
