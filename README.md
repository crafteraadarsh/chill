# Tic-Tac-Toe

A fully playable Tic-Tac-Toe game built in vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. Runs in any browser by opening `index.html`.

---

## How to Run

```bash
git clone https://github.com/crafteraadarsh/chill.git
cd chill
open index.html        # Mac
xdg-open index.html   # Linux
```

Or for best Web Audio support, serve locally:

```bash
npx serve .
# open http://localhost:3000
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (Grid, custom properties, keyframe animations) |
| Logic | Vanilla JavaScript (ES6+) |
| AI | Minimax algorithm (pure JS, no library) |
| Audio | Web Audio API (no external sound files) |
| Hosting | GitHub Pages ready |

---

## How It Was Developed

The game was built in three incremental phases, each merged as a separate pull request:

### Phase 1 — MVP
The core game loop: a 3×3 CSS Grid board, turn switching between X and O, win/draw detection across all 8 lines (3 rows, 3 columns, 2 diagonals), and a restart button. No external assets — everything is plain HTML, CSS, and JS.

### Phase 2 — Polish
UX improvements layered on top of the MVP:
- **Score tracker** — persistent X / Draws / O tally across rounds without a page reload
- **Pop-in animation** — cells scale from 60% to 100% with a slight overshoot on mark
- **Winner pulse** — winning cells glow with a looping `box-shadow` animation
- **Sound effects** — click beep, 3-note ascending win jingle, and a draw buzz, all generated in real time via the Web Audio API (zero asset files)

### Phase 3 — AI Opponent
Single-player mode with two difficulty levels, selectable via a radio group:
- **Easy** — picks a random empty cell each turn
- **Hard** — uses the Minimax algorithm to play perfectly (unbeatable)

The AI takes its move 400 ms after the player's click to feel natural.

---

## How the AI Works

The hard-mode AI uses **Minimax**, a recursive game-tree search algorithm:

```
minimax(board, depth, isMaximizing):
  if terminal state → return score (+10 win / -10 loss / 0 draw, adjusted by depth)
  if isMaximizing (AI's turn):
    try every empty cell as 'O'
    return the move with the highest score
  else (player's turn):
    try every empty cell as 'X'
    return the move with the lowest score
```

**Why it's unbeatable:** Minimax explores every possible future game state from the current position. The AI always picks the move that leads to the best guaranteed outcome, assuming the opponent also plays optimally. On a 3×3 board the search tree is small enough (≤ 9! = 362 880 states) to run instantly in the browser.

**Depth penalty** — scores are offset by `±depth` so the AI prefers winning sooner and losing later, rather than treating all wins equally.

```js
function minimax(board, depth, isMaximizing) {
  const score = checkTerminal(board);
  if (score !== null) return score - (isMaximizing ? depth : -depth);
  // ... recurse over empty cells
}
```

---

## File Structure

```
chill/
├── index.html       — Game markup + mode selector
├── style.css        — Layout, dark theme, animations
├── game.js          — Game state, turn logic, score tracking
├── ai.js            — Minimax (hard) + random (easy) AI
└── TIC-TAC-TOE.md   — Original development plan
```
