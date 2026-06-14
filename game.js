const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

const state = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  gameOver: false,
  scores: { X: 0, O: 0, D: 0 },
  mode: '2p',
};

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreD = document.getElementById('score-d');
const modeInputs = document.querySelectorAll('input[name="mode"]');

modeInputs.forEach(input => {
  input.addEventListener('change', e => {
    state.mode = e.target.value;
    restart();
  });
});

function checkWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return { winner: board[a], line: [a,b,c] };
  }
  if (board.every(c => c !== null)) return { draw: true, winner: null, line: [] };
  return null;
}

function updateScoreboard() {
  scoreX.textContent = state.scores.X;
  scoreO.textContent = state.scores.O;
  scoreD.textContent = state.scores.D;
}

function applyMove(idx, player) {
  state.board[idx] = player;
  const cell = cells[idx];
  cell.textContent = player;
  cell.classList.add('taken', player.toLowerCase(), 'pop');
}

function endGame(result) {
  state.gameOver = true;
  if (result.draw) {
    state.scores.D++;
    statusEl.textContent = "It's a draw!";
  } else {
    state.scores[result.winner]++;
    const label = state.mode !== '2p' && result.winner === 'O' ? 'AI' : 'Player ' + result.winner;
    statusEl.innerHTML = '<strong>' + label + '</strong> wins!';
    result.line.forEach(i => cells[i].classList.add('winner'));
  }
  updateScoreboard();
}

function aiTurn() {
  if (state.gameOver) return;
  const move = state.mode === 'hard'
    ? AI.bestMove([...state.board])
    : AI.randomMove([...state.board]);
  if (move === undefined) return;

  setTimeout(() => {
    applyMove(move, 'O');
    const result = checkWinner(state.board);
    if (result) { endGame(result); return; }
    state.currentPlayer = 'X';
    statusEl.innerHTML = "Player <span>X</span>'s turn";
  }, 400);
}

function handleClick(e) {
  const idx = parseInt(e.target.dataset.index);
  if (state.board[idx] || state.gameOver) return;

  applyMove(idx, state.currentPlayer);

  const result = checkWinner(state.board);
  if (result) { endGame(result); return; }

  if (state.mode !== '2p') {
    state.currentPlayer = 'O';
    statusEl.textContent = 'AI is thinking...';
    aiTurn();
  } else {
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    statusEl.innerHTML = 'Player <span>' + state.currentPlayer + "</span>'s turn";
  }
}

function restart() {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'X';
  state.gameOver = false;
  statusEl.innerHTML = "Player <span>X</span>'s turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);
