const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick() {
    if (!gameActive || this.textContent !== "") return;

    this.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `Победил ${currentPlayer}!`;
        gameActive = false;
        return;
    }

    if (isDraw()) {
        statusText.textContent = "Ничья";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Ход: ${currentPlayer}`;
}

function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(index =>
            cells[index].textContent === currentPlayer
        );
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Ход: X";
}