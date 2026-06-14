# Tic-Tac-Toe Game — Development Plan

## Overview

A classic 3×3 Tic-Tac-Toe game playable in the browser. Two players take turns marking X and O. First to get 3 in a row (horizontal, vertical, or diagonal) wins.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | HTML + CSS + Vanilla JavaScript |
| Styling | CSS Grid + custom variables |
| State | Plain JS object (no framework needed) |
| Hosting | GitHub Pages |

---

## Features

### MVP (Phase 1)
- [x] 3×3 grid rendered with CSS Grid
- [ ] Two-player mode (X and O take turns)
- [ ] Win detection (rows, columns, diagonals)
- [ ] Draw detection (all cells filled, no winner)
- [ ] Highlight winning cells
- [ ] Restart / Play Again button
- [ ] Display current player's turn

### Phase 2 — Polish
- [ ] Score tracker (wins per player, draws)
- [ ] Animated cell fill (scale + fade in)
- [ ] Winning line animation (strikethrough)
- [ ] Sound effects (click, win, draw)
- [ ] Responsive design (mobile friendly)

### Phase 3 — AI Opponent
- [ ] Single-player mode vs computer
- [ ] Easy mode: random moves
- [ ] Hard mode: Minimax algorithm (unbeatable)
- [ ] Difficulty selector

---

## File Structure

```
chill/
├── index.html        # Game markup
├── style.css         # Grid, cells, animations
├── game.js           # Game logic (state, turns, win check)
├── ai.js             # AI opponent (minimax)
└── TIC-TAC-TOE.md    # This plan
```

---

## Game Logic Breakdown

### Board State
```js
const state = {
  board: Array(9).fill(null),  // null | 'X' | 'O'
  currentPlayer: 'X',
  winner: null,
  gameOver: false,
};
```

### Win Conditions
```js
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];
```

### Turn Flow
```
User clicks cell
  → cell is empty?
    → mark cell with currentPlayer
    → checkWinner()
      → winner found? → show winner, end game
      → board full?   → show draw, end game
      → else          → switch player, continue
```

---

## Minimax Algorithm (Hard AI)

The AI evaluates every possible future game state and picks the move that maximizes its score while minimizing the player's score.

```
minimax(board, isMaximizing):
  if terminal state → return score (+10 / -10 / 0)
  if isMaximizing:
    bestScore = -Infinity
    for each empty cell:
      board[cell] = 'O'
      score = minimax(board, false)
      board[cell] = null
      bestScore = max(score, bestScore)
    return bestScore
  else:
    bestScore = +Infinity
    for each empty cell:
      board[cell] = 'X'
      score = minimax(board, true)
      board[cell] = null
      bestScore = min(score, bestScore)
    return bestScore
```

---

## UI Wireframe

```
┌─────────────────────────┐
│    Tic-Tac-Toe           │
│    Player X's turn       │
│                          │
│  ┌───┬───┬───┐           │
│  │ X │   │ O │           │
│  ├───┼───┼───┤           │
│  │   │ X │   │           │
│  ├───┼───┼───┤           │
│  │ O │   │ X │           │
│  └───┴───┴───┘           │
│                          │
│     [ Restart ]          │
│   X: 3  Draws: 1  O: 2  │
└─────────────────────────┘
```

---

## Development Milestones

| Milestone | Tasks | Est. Time |
|---|---|---|
| M1 — Core | HTML structure, CSS grid, basic JS state | 1–2 hrs |
| M2 — Logic | Turn switching, win/draw detection | 1 hr |
| M3 — UI | Highlighting, animations, restart | 1 hr |
| M4 — AI | Minimax, difficulty modes | 2–3 hrs |
| M5 — Deploy | GitHub Pages setup | 30 min |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/crafteraadarsh/chill.git
cd chill

# Open in browser (no build step needed)
open index.html
```
