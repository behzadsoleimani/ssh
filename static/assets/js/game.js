// @ts-check

import { fetchData } from "./api.js";
import { updateInfoMessage, updateBoard } from "./utils.js";

/**
 * @typedef {'RUNNING' | 'X_WON' | 'O_WON' | 'DRAW' | null} GameStatus
 */

/**
 * The initial state of the game board.
 * @type {string}
 */
const INITIAL_BOARD = "---------";

/**
 * The unique id for the current game.
 * @type {string|null}
 */
let gameId = null;

/**
 * The mark of the current player.
 * @type {'x' | 'o'}
 */
let playerMark = "o";

/**
 * The status of the game.
 * @type {GameStatus}
 */
let currentStatus = null;

/**
 * Manages API calls for the Tic Tac Toe game.
 * @param {string} apiMethod - The HTTP method
 * @param {string} endpoint - The API endpoint to call.
 * @param {Object} [body] - The body of the request.
 * @returns {Promise<{id: string, board: string, status: GameStatus}>}
 */
async function manageGame(apiMethod, endpoint, body) {
  const apiUrl = `games${endpoint ? `/${endpoint}` : ""}`;
  const { board, status, id } = await fetchData(apiUrl, {
    method: apiMethod,
    body,
  });
  const isRunning = status === "RUNNING";
  currentStatus = status;
  gameId = id;

  if (board) {
    updateGameBoard(board);
  }
  if (!isRunning) {
    updateInfoMessage(status);
  }

  return { board, status, id };
}

/**
 * Updates the display of the game board based on the provided board state.
 * @param {string} board - The current state of the game board.
 */
function updateGameBoard(board) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.classList.remove("mark-x", "mark-o", "mark--");
    cell.classList.add(`mark-${board[index]}`);
  });
}

/**
 * Starts a new game session with the specified initial board state.
 * @param {string} [initialBoard=INITIAL_BOARD] - The initial state of the game board.
 * @param {boolean} [withResetGame] - start game with Reset.
 * @returns {Promise<void>}
 */
export async function startGame(
  initialBoard = INITIAL_BOARD,
  withResetGame = true
) {
  if (withResetGame) resetGame();
  await manageGame("POST", "", { board: initialBoard });
}

// Resets game values to their initial state.
function resetValues() {
  gameId = null;
  currentStatus = null;
  playerMark = "o";
}

// Resets the event listeners for game cells.
function resetListeners() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
}


// Resets the game to its initial state.
async function resetGame() {
  resetListeners();
  resetValues();
  updateInfoMessage();
  updateGameBoard(INITIAL_BOARD);
}

/**
 * Handles click events on game cells,
 * determining the next state of the game board.
 * @param {Event} event - The click event triggered by interacting with a game cell.
 * @returns {Promise<void>}
 */
export async function handleCellClick(event) {
  const target = event.target;
  if (target instanceof HTMLDivElement && target.classList.contains("mark--")) {
    const index = Number(target.dataset.index);
    if (gameId) {
      if (!target.classList.contains("mark--") || !gameId) return;

      const gameData = await manageGame("GET", gameId);

      if (!gameData || gameData.status !== "RUNNING") {
        updateInfoMessage("Game is over! Please start a new one");
        return;
      }

      const updatedBoard = updateBoard(gameData.board, playerMark, index);
      await manageGame("PUT", gameId, { board: updatedBoard });
    } else {
      startGame(updateBoard(INITIAL_BOARD, playerMark, index), false);
    }
  }
}

/**
 * Sets the current player's mark to either 'x' or 'o'.
 * @param {'x' | 'o'} mark - The mark to set for the current player.
 */
export function setPlayerMark(mark) {
  if (gameId) resetGame();
  playerMark = mark;
}
