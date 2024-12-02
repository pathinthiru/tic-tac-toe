const socket = io();
const gameBoard = document.getElementById('game-board');
const startGameButton = document.getElementById('start-game');
const qrCodeContainer = document.getElementById('qr-code');

let gameId = 'game123'; // Generate a unique game ID (you can randomize this)
let currentPlayer = 'X';

// Initialize the board display
function initializeBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleMove(i));
    gameBoard.appendChild(cell);
  }
}

// Handle player move
function handleMove(position) {
  if (!gameState.board[position]) {
    socket.emit('playerMove', { gameId, position, symbol: currentPlayer });
  }
}

// Update the game state from server
socket.on('gameState', (state) => {
  gameState = state;
  renderBoard(state.board);
});

// Render the game board based on game state
function renderBoard(board) {
  const cells = gameBoard.getElementsByClassName('cell');
  for (let i = 0; i < 9; i++) {
    cells[i].textContent = board[i] || '';
  }
}

// Start the game and generate the QR code
startGameButton.addEventListener('click', () => {
  socket.emit('startGame', gameId);
  generateQRCode();
});

// Generate QR code for the game
function generateQRCode() {
  const qrCode = new QRCode(qrCodeContainer, {
    text: `http://localhost:3000/?gameId=${gameId}`,
    width: 128,
    height: 128,
  });
}

