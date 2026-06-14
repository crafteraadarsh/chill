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
};

const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreD = document.getElementById('score-d');

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const ctx = AudioCtx ? new AudioCtx() : null;

function beep(freq, duration, type = 'sine') {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = type;
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(); osc.stop(ctx.currentTime + duration);
}

function playClick()  { beep(440, 0.08); }
function playWin()    { beep(523, 0.12); setTimeout(() => beep(659, 0.12), 120); setTimeout(() => beep(784, 0.2), 240); }
function playDraw()   { beep(300, 0.25, 'sawtooth'); }

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

function render() {
  cells.forEach((cell, i) => {
    cell.textContent = state.board[i] || '';
    cell.className = 'cell';
    if (state.board[i]) cell.classList.add('taken', state.board[i].toLowerCase());
  });
}

function handleClick(e) {
  const idx = parseInt(e.target.dataset.index);
  if (state.board[idx] || state.gameOver) return;

  state.board[idx] = state.currentPlayer;
  playClick();

  const cell = cells[idx];
  cell.textContent = state.currentPlayer;
  cell.classList.add('taken', state.currentPlayer.toLowerCase(), 'pop');

  const result = checkWinner(state.board);
  if (result) {
    state.gameOver = true;
    if (result.draw) {
      state.scores.D++;
      statusEl.textContent = "It's a draw!";
      playDraw();
    } else {
      state.scores[result.winner]++;
      statusEl.innerHTML = `Player <strong>${result.winner}</strong> wins!`;
      result.line.forEach(i => cells[i].classList.add('winner'));
      playWin();
    }
    updateScoreboard();
    return;
  }

  state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
  statusEl.innerHTML = `Player <span>${state.currentPlayer}</span>'s turn`;
}

function restart() {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'X';
  state.gameOver = false;
  statusEl.innerHTML = "Player <span>X</span>'s turn";
  render();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);
render();
