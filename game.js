const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const state = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  gameOver: false,
};

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const currentPlayerEl = document.getElementById('current-player');
const restartBtn = document.getElementById('restart');

function checkWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a,b,c] };
    }
  }
  if (board.every(cell => cell !== null)) return { winner: null, line: [], draw: true };
  return null;
}

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = state.board[i] || '';
    cell.className = 'cell';
    if (state.board[i]) {
      cell.classList.add('taken', state.board[i].toLowerCase());
    }
  });
  currentPlayerEl.textContent = state.currentPlayer;
}

function handleClick(e) {
  const idx = parseInt(e.target.dataset.index);
  if (state.board[idx] || state.gameOver) return;

  state.board[idx] = state.currentPlayer;
  const result = checkWinner(state.board);

  if (result) {
    state.gameOver = true;
    render();
    if (result.draw) {
      statusEl.textContent = "It's a draw!";
    } else {
      statusEl.innerHTML = `Player <strong>${result.winner}</strong> wins! 🎉`;
      result.line.forEach(i => cells[i].classList.add('winner'));
    }
    return;
  }

  state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
  render();
  statusEl.innerHTML = `Player <span id="current-player">${state.currentPlayer}</span>'s turn`;
}

function restart() {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'X';
  state.gameOver = false;
  statusEl.innerHTML = 'Player <span id="current-player">X</span>\'s turn';
  render();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);
render();
