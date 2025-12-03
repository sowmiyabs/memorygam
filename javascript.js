const vehicleCardsArray = [
  "🚗","🚗",
  "🚕","🚕",
  "🚙","🚙",
  "🚌","🚌",
  "🏎️","🏎️",
  "🚓","🚓"
];const cardsArray = vehicleCardsArray;

const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

let flippedCards = [];
let matchedCount = 0;

// Shuffle function using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = "";
    matchedCount = 0;
    flippedCards = [];

    const shuffled = [...cardsArray];
    shuffle(shuffled);

    shuffled.forEach((emoji, index) => {
        // card elements
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = emoji;

        const front = document.createElement("div");
        front.classList.add("front");
        front.textContent = emoji;

        const back = document.createElement("div");
        back.classList.add("back");
        back.textContent = "?";

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener("click", () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (card.classList.contains("flipped") || flippedCards.length === 2) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;

    if (match) {
        matchedCount += 1;
        flippedCards = [];

        if (matchedCount === cardsArray.length / 2) {
            setTimeout(() => alert("🎉 You Won!"), 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 800);
    }
}

// Restart game
restartBtn.addEventListener("click", () => createBoard());

// Start game initially
createBoard();


