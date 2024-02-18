// @ts-check

/**
 * Updates the game board with the specified player mark at the given index.
 * @param {string} board - The current state of the game board.
 * @param {'x' | 'o'} playerMark - The mark to be placed on the board.
 * @param {number} index - The index where the player mark should be placed on the board.
 * @returns {string} The updated game board.
 */
export function updateBoard(board, playerMark, index) {
  return board.substring(0, index) + playerMark + board.substring(index + 1);
}

/**
 * Updates the game status message based on the provided status.
 * @param {string} [status] - The status message to be displayed.
 */
export function updateInfoMessage(status = "") {
  const statusElement = document.getElementById("game-status");

  if (!statusElement) return;

  statusElement.textContent =
    status !== "RUNNING" ? status.replace("_", " ") : "";
}
