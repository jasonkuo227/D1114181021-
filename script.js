const symbols = ["🍎","🍌","🍇","🍉","🍒","🍍","🥝","🍋"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let time = 0;
let timerInterval;
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startGame() {
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";

    cards = shuffle([...symbols, ...symbols]);
    matchedPairs = 0;

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;

        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });

    timerInterval = setInterval(() => {
        time++;
        document.getElementById("timer").innerText = time;
    }, 1000);
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    document.getElementById("moves").innerText = moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchedPairs++;

        if (matchedPairs === symbols.length) {
            clearInterval(timerInterval);

            setTimeout(() => {
                const msg = document.getElementById("winMessage");
                const stats = document.getElementById("finalStats");

                stats.innerText = `時間：${time} 秒 / 步數：${moves}`;
                msg.classList.remove("hidden");
            }, 300);
        }

        resetTurn();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "";
            secondCard.innerText = "";
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    clearInterval(timerInterval);
    time = 0;
    moves = 0;
    matchedPairs = 0;

    document.getElementById("timer").innerText = 0;
    document.getElementById("moves").innerText = 0;

    document.getElementById("winMessage").classList.add("hidden");

    startGame();
}

startGame();
