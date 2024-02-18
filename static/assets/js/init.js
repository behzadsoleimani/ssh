// @ts-check

import { startGame, setPlayerMark, handleCellClick } from "./game.js";

const BUTTONS = [
  {
    title: "Let Computer Start",
    onClick: () => startGame(),
  },
  {
    title: "Start as Player X",
    onClick: () => setPlayerMark("x"),
  },
  {
    title: "Start as Player O",
    onClick: () => setPlayerMark("o"),
  },
];

/**
 * Creates a cell element with the specified index and adds click event listener.
 * @param {number} index - The index of the cell.
 * @returns {HTMLDivElement} The created cell element.
 */
function createCell(index) {
  const cell = document.createElement("div");
  cell.classList.add("cell", "flex-center");
  cell.dataset.index = index.toString();
  cell.addEventListener("click", handleCellClick, { once: true });
  cell.classList.add("mark--");
  return cell;
}

// Initializes the game board by creating cells, setting up event listeners.
function initializeGameBoard() {
  const container = document.getElementById("game-container");
  const table = document.getElementById("board");

  if (!table || !container) return;

  for (let i = 0; i < 9; i++) {
    const cell = createCell(i);
    table.appendChild(cell);
  }

  container.appendChild(table);
}

// Creates and attaches footer buttons for starting the game and choosing player marks.
function createFooterButtons() {
  const footer = document.getElementById("footer");
  if (!footer) return;
  BUTTONS.forEach((button) => {
    const btn = document.createElement("div");
    btn.classList.add("btn");
    btn.textContent = button.title;
    btn.addEventListener("click", button.onClick);
    footer.appendChild(btn);
  });
}

// Initialize the game board and footer buttons
initializeGameBoard();
createFooterButtons();
