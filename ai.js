const WIN_LINES_AI = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkTerminal(board) {
  for (const [a,b,c] of WIN_LINES_AI) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a] === 'O' ? 10 : -10;
  }
  if (board.every(c => c !== null)) return 0;
  return null;
}

function minimax(board, depth, isMaximizing) {
  const score = checkTerminal(board);
  if (score !== null) return score - (isMaximizing ? depth : -depth);

  const empties = board.map((v,i) => v === null ? i : -1).filter(i => i >= 0);

  if (isMaximizing) {
    let best = -Infinity;
    for (const i of empties) {
      board[i] = 'O';
      best = Math.max(best, minimax(board, depth + 1, false));
      board[i] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empties) {
      board[i] = 'X';
      best = Math.min(best, minimax(board, depth + 1, true));
      board[i] = null;
    }
    return best;
  }
}

function bestMove(board) {
  const empties = board.map((v,i) => v === null ? i : -1).filter(i => i >= 0);
  let best = -Infinity, move = empties[0];
  for (const i of empties) {
    board[i] = 'O';
    const score = minimax(board, 0, false);
    board[i] = null;
    if (score > best) { best = score; move = i; }
  }
  return move;
}

function randomMove(board) {
  const empties = board.map((v,i) => v === null ? i : -1).filter(i => i >= 0);
  return empties[Math.floor(Math.random() * empties.length)];
}

window.AI = { bestMove, randomMove };
