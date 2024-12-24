const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

const cardsArray = [
  '🍎',
  '🍎',
  '🍌',
  '🍌',
  '🍇',
  '🍇',
  '🍒',
  '🍒',
  '🍍',
  '🍍',
  '🍉',
  '🍉',
  '🍑',
  '🍑',
  '🍓',
  '🍓',
];

// Shuffle the cards using Fisher-Yates Algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the game board by adding shuffled cards
function createBoard() {
  gameBoard.innerHTML = ''; // Clear previous cards
  const shuffledCards = shuffle([...cardsArray]);
  shuffledCards.forEach((cardContent) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <div class="front-face">${cardContent}</div>
            <div class="back-face">?</div>
        `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Handle card flip
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card clicked
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Second card clicked
  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

// Check if two cards match
function checkForMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Unflip unmatched cards after a short delay
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

// Reset board state for the next turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Restart the game
function restartGame() {
  resetBoard();
  createBoard();
}

// Add event listener to the restart button
restartButton.addEventListener('click', restartGame);

// Initialize the game
createBoard();
