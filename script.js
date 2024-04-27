let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameStatusDisplay = document.getElementById('game-status');

// Function to handle cell click
function handleCellClick(cellIndex) {
    if (gameBoard[cellIndex] === '' && !isGameOver()) {
        gameBoard[cellIndex] = currentPlayer;
        renderGameBoard();
        if (checkWinner(currentPlayer)) {
            gameStatusDisplay.textContent = `Player ${currentPlayer} wins!`;
        } else if (isBoardFull()) {
            gameStatusDisplay.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to render the game board
function renderGameBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        document.getElementById(`cell-${i}`).textContent = gameBoard[i];
    }
}

// Function to check for a winner
function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

// Function to check if the board is full
function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderGameBoard();
    gameStatusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check if the game is over
function isGameOver() {
    return checkWinner('X') || checkWinner('O') || isBoardFull();
}

// Event listeners for cell clicks
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Initialize the game
resetGame();
